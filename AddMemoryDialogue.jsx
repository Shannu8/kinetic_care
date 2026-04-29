import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { base44 } from "@/api/base44Client";
import { Loader2 } from "lucide-react";

const PATIENT_ID = "69f1cca782e4855c1a8c6fc2";

const categories = [
  { value: "family", label: "Family" },
  { value: "event", label: "Life Event" },
  { value: "place", label: "Place" },
  { value: "music", label: "Music" },
  { value: "food", label: "Food" },
  { value: "hobby", label: "Hobby" },
  { value: "pet", label: "Pet" },
  { value: "work", label: "Work" },
  { value: "other", label: "Other" },
];

const significanceLevels = [
  { value: "very_important", label: "Very Important" },
  { value: "important", label: "Important" },
  { value: "moderate", label: "Moderate" },
  { value: "casual", label: "Casual" },
];

export default function AddMemoryDialog({ open, onClose, onCreated }) {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "", description: "", category: "family",
    people_involved: "", date_of_memory: "",
    emotional_significance: "important",
    relationship: "", ai_context: "",
  });

  async function handleSave() {
    if (!form.title) return;
    setSaving(true);

    // Generate AI context if not provided
    let aiContext = form.ai_context;
    if (!aiContext && form.description) {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Summarize this memory in 1-2 concise sentences for an AI companion to use when talking to an elderly patient with dementia. Memory title: "${form.title}". Description: "${form.description}". People: "${form.people_involved}". Make it warm and personal.`,
      });
      aiContext = result;
    }

    await base44.entities.Memory.create({
      ...form,
      patient_id: PATIENT_ID,
      ai_context: aiContext,
      added_by: "Family Member",
    });

    setSaving(false);
    setForm({ title: "", description: "", category: "family", people_involved: "", date_of_memory: "", emotional_significance: "important", relationship: "", ai_context: "" });
    onCreated?.();
    onClose();
  }

  function update(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display">Add a Memory</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div>
            <Label>Title *</Label>
            <Input placeholder="e.g., Summer vacation 2005" value={form.title} onChange={e => update("title", e.target.value)} />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea placeholder="Describe this memory in detail..." value={form.description} onChange={e => update("description", e.target.value)} rows={3} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Category</Label>
              <Select value={form.category} onValueChange={v => update("category", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {categories.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Significance</Label>
              <Select value={form.emotional_significance} onValueChange={v => update("emotional_significance", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {significanceLevels.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label>People Involved</Label>
            <Input placeholder="e.g., Sarah, Tom, Leo" value={form.people_involved} onChange={e => update("people_involved", e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Date of Memory</Label>
              <Input type="date" value={form.date_of_memory} onChange={e => update("date_of_memory", e.target.value)} />
            </div>
            <div>
              <Label>Your Relationship</Label>
              <Input placeholder="e.g., Daughter" value={form.relationship} onChange={e => update("relationship", e.target.value)} />
            </div>
          </div>
          <div>
            <Label>AI Context (optional)</Label>
            <Textarea placeholder="Brief note for the AI companion to use when discussing this memory..." value={form.ai_context} onChange={e => update("ai_context", e.target.value)} rows={2} />
            <p className="text-xs text-muted-foreground mt-1">If left empty, AI will auto-generate context from the description.</p>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving || !form.title}>
              {saving && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              Save Memory
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
