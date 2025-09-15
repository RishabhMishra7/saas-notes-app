import { Router } from "express";
import { AuthRequest } from "../types";
import { authenticate } from "../middleware/auth";
import { NoteService } from "../services/note.service";

const router = Router();
const noteService = new NoteService();

router.use(authenticate);

router.post("/notes", async (req: AuthRequest, res) => {
  try {
    const { title, content } = req.body;
    const note = await noteService.create(
      title,
      content,
      req.user!.id,
      req.user!.tenantId
    );
    res.status(201).json(note);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/notes", async (req: AuthRequest, res) => {
  try {
    const notes = await noteService.findAll(req.user!.tenantId);
    res.json(notes);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/notes/:id", async (req: AuthRequest, res) => {
  try {
    const note = await noteService.findOne(req.params.id, req.user!.tenantId);
    res.json(note);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
});

router.put("/notes/:id", async (req: AuthRequest, res) => {
  try {
    const { title, content } = req.body;
    const note = await noteService.update(
      req.params.id,
      title,
      content,
      req.user!.tenantId
    );
    res.json(note);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/notes/:id", async (req: AuthRequest, res) => {
  try {
    await noteService.delete(req.params.id, req.user!.tenantId);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
