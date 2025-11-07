import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Plus, Save, Trash2, Edit, Eye, EyeOff, 
  GripVertical, BookOpen, Video, FileText 
} from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { supabase } from "../lib/supabase";

interface Module {
  id: number;
  title: string;
  description: string;
  duration: string;
  order_number: number;
  is_active: boolean;
  icon: string;
}

interface Lesson {
  id: number;
  module_id: number;
  title: string;
  description: string;
  duration: string;
  vimeo_id: string;
  order_number: number;
  is_active: boolean;
  is_preview: boolean;
}

export function AdminCourse() {
  const [modules, setModules] = useState<Module[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingModule, setEditingModule] = useState<Module | null>(null);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [isAddingModule, setIsAddingModule] = useState(false);
  const [isAddingLesson, setIsAddingLesson] = useState<number | null>(null);

  // Load modules and lessons
  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    console.log("📚 AdminCourse - Loading content...");
    setIsLoading(true);

    try {
      const { data: modulesData, error: modulesError } = await supabase
        .from('course_modules')
        .select('*')
        .order('order_number', { ascending: true });

      if (modulesError) throw modulesError;

      const { data: lessonsData, error: lessonsError } = await supabase
        .from('course_lessons')
        .select('*')
        .order('order_number', { ascending: true });

      if (lessonsError) throw lessonsError;

      setModules(modulesData || []);
      setLessons(lessonsData || []);
    } catch (error) {
      console.error('Error loading content:', error);
      toast.error('Nepodařilo se načíst obsah kurzu', {
        description: 'Zkuste obnovit stránku nebo zkontrolujte připojení',
        action: {
          label: 'Obnovit',
          onClick: () => window.location.reload()
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Save module
  const saveModule = async (module: Partial<Module>) => {
    try {
      if (module.id) {
        // Update
        const { error } = await supabase
          .from('course_modules')
          .update(module)
          .eq('id', module.id);

        if (error) throw error;
        toast.success('Modul aktualizován! ✅');
      } else {
        // Insert
        const { error } = await supabase
          .from('course_modules')
          .insert([module]);

        if (error) throw error;
        toast.success('Modul přidán! ✅');
      }

      loadContent();
      setEditingModule(null);
      setIsAddingModule(false);
    } catch (error) {
      console.error('Error saving module:', error);
      toast.error('Chyba při ukládání modulu');
    }
  };

  // Save lesson
  const saveLesson = async (lesson: Partial<Lesson>) => {
    try {
      if (lesson.id) {
        // Update
        const { error } = await supabase
          .from('course_lessons')
          .update(lesson)
          .eq('id', lesson.id);

        if (error) throw error;
        toast.success('Lekce aktualizována! ✅');
      } else {
        // Insert
        const { error } = await supabase
          .from('course_lessons')
          .insert([lesson]);

        if (error) throw error;
        toast.success('Lekce přidána! ✅');
      }

      loadContent();
      setEditingLesson(null);
      setIsAddingLesson(null);
    } catch (error) {
      console.error('Error saving lesson:', error);
      toast.error('Chyba při ukládání lekce');
    }
  };

  // Delete module
  const deleteModule = async (id: number) => {
    if (!confirm('Opravdu chcete smazat tento modul a všechny jeho lekce?')) return;

    try {
      const { error } = await supabase
        .from('course_modules')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Modul smazán! ✅');
      loadContent();
    } catch (error) {
      console.error('Error deleting module:', error);
      toast.error('Chyba při mazání modulu');
    }
  };

  // Delete lesson
  const deleteLesson = async (id: number) => {
    if (!confirm('Opravdu chcete smazat tuto lekci?')) return;

    try {
      const { error } = await supabase
        .from('course_lessons')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Lekce smazána! ✅');
      loadContent();
    } catch (error) {
      console.error('Error deleting lesson:', error);
      toast.error('Chyba při mazání lekce');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Načítám...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Admin - Správa kurzu
                </h1>
                <p className="text-sm text-gray-600">
                  {modules.length} modulů, {lessons.length} lekcí
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={() => setIsAddingModule(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nový modul
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.href = "/course"}
              >
                <Eye className="w-4 h-4 mr-2" />
                Náhled kurzu
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {modules.map((module) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            {/* Module Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <GripVertical className="w-5 h-5 opacity-50 cursor-move" />
                  <div>
                    <h3 className="text-xl font-bold">{module.title}</h3>
                    <p className="text-sm opacity-90">{module.description}</p>
                    <p className="text-xs opacity-75 mt-1">
                      {module.duration} • Pořadí: {module.order_number}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    onClick={() => setIsAddingLesson(module.id)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Přidat lekci
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    onClick={() => setEditingModule(module)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white/10 border-white/20 text-white hover:bg-red-500"
                    onClick={() => deleteModule(module.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <div className="flex items-center gap-2 ml-2">
                    {module.is_active ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Lessons */}
            <div className="p-6 space-y-3">
              {lessons
                .filter((l) => l.module_id === module.id)
                .map((lesson) => (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                      <Video className="w-5 h-5 text-blue-600" />
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {lesson.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {lesson.description}
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-gray-500">
                            {lesson.duration}
                          </span>
                          {lesson.vimeo_id && (
                            <span className="text-xs text-gray-500">
                              Vimeo: {lesson.vimeo_id}
                            </span>
                          )}
                          {lesson.is_preview && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                              Preview
                            </span>
                          )}
                          <span className="text-xs text-gray-500">
                            Pořadí: {lesson.order_number}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingLesson(lesson)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteLesson(lesson.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                      <div className="ml-2">
                        {lesson.is_active ? (
                          <Eye className="w-4 h-4 text-green-600" />
                        ) : (
                          <EyeOff className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}

              {lessons.filter((l) => l.module_id === module.id).length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p>Žádné lekce v tomto modulu</p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-3"
                    onClick={() => setIsAddingLesson(module.id)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Přidat první lekci
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {modules.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="mb-4">Zatím nemáte žádné moduly</p>
            <Button onClick={() => setIsAddingModule(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Vytvořit první modul
            </Button>
          </div>
        )}
      </div>

      {/* Module Edit Dialog */}
      <ModuleEditDialog
        module={editingModule}
        isOpen={!!editingModule || isAddingModule}
        onClose={() => {
          setEditingModule(null);
          setIsAddingModule(false);
        }}
        onSave={saveModule}
      />

      {/* Lesson Edit Dialog */}
      <LessonEditDialog
        lesson={editingLesson}
        moduleId={isAddingLesson}
        isOpen={!!editingLesson || !!isAddingLesson}
        onClose={() => {
          setEditingLesson(null);
          setIsAddingLesson(null);
        }}
        onSave={saveLesson}
      />
    </div>
  );
}

// Module Edit Dialog Component
function ModuleEditDialog({ module, isOpen, onClose, onSave }: any) {
  const [formData, setFormData] = useState<Partial<Module>>({
    title: '',
    description: '',
    duration: '',
    order_number: 1,
    is_active: true,
    icon: 'BookOpen',
  });

  useEffect(() => {
    if (module) {
      setFormData(module);
    } else {
      setFormData({
        title: '',
        description: '',
        duration: '',
        order_number: 1,
        is_active: true,
        icon: 'BookOpen',
      });
    }
  }, [module]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {module ? 'Upravit modul' : 'Nový modul'}
          </DialogTitle>
          <DialogDescription>
            Vyplňte informace o modulu kurzu
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Název modulu
            </label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Např. Zákaznické segmenty"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Popis
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Krátký popis modulu"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Doba trvání
              </label>
              <Input
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="Např. 45 min"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pořadí
              </label>
              <Input
                type="number"
                value={formData.order_number}
                onChange={(e) => setFormData({ ...formData, order_number: parseInt(e.target.value) })}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Switch
              checked={formData.is_active}
              onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
            />
            <label className="text-sm font-medium text-gray-700">
              Aktivní (viditelné pro uživatele)
            </label>
          </div>

          <div className="flex items-center gap-3 pt-4">
            <Button
              onClick={() => onSave(formData)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Save className="w-4 h-4 mr-2" />
              Uložit
            </Button>
            <Button variant="outline" onClick={onClose}>
              Zrušit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Lesson Edit Dialog Component
function LessonEditDialog({ lesson, moduleId, isOpen, onClose, onSave }: any) {
  const [formData, setFormData] = useState<Partial<Lesson>>({
    module_id: moduleId || 0,
    title: '',
    description: '',
    duration: '',
    vimeo_id: '',
    order_number: 1,
    is_active: true,
    is_preview: false,
  });

  useEffect(() => {
    if (lesson) {
      setFormData(lesson);
    } else if (moduleId) {
      setFormData({
        module_id: moduleId,
        title: '',
        description: '',
        duration: '',
        vimeo_id: '',
        order_number: 1,
        is_active: true,
        is_preview: false,
      });
    }
  }, [lesson, moduleId]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {lesson ? 'Upravit lekci' : 'Nová lekce'}
          </DialogTitle>
          <DialogDescription>
            Vyplňte informace o lekci
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Název lekce
            </label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Např. Úvod do zákaznických segmentů"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Popis
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Krátký popis lekce"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vimeo ID
              </label>
              <Input
                value={formData.vimeo_id}
                onChange={(e) => setFormData({ ...formData, vimeo_id: e.target.value })}
                placeholder="Např. 76979871"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Doba trvání
              </label>
              <Input
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="Např. 15 min"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pořadí
            </label>
            <Input
              type="number"
              value={formData.order_number}
              onChange={(e) => setFormData({ ...formData, order_number: parseInt(e.target.value) })}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Switch
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
              <label className="text-sm font-medium text-gray-700">
                Aktivní (viditelné pro uživatele)
              </label>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={formData.is_preview}
                onCheckedChange={(checked) => setFormData({ ...formData, is_preview: checked })}
              />
              <label className="text-sm font-medium text-gray-700">
                Preview lekce (dostupná bez kurzu)
              </label>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4">
            <Button
              onClick={() => onSave(formData)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Save className="w-4 h-4 mr-2" />
              Uložit
            </Button>
            <Button variant="outline" onClick={onClose}>
              Zrušit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
