import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class NoteService {
  async create(
    title: string,
    content: string,
    userId: string,
    tenantId: string
  ) {
    // Check if tenant is on free plan and has reached limit
    const tenant = await prisma.tenant.findUnique({
      where: { id: tenantId },
      include: { notes: true },
    });

    if (!tenant) {
      throw new Error("Tenant not found");
    }

    if (tenant.plan === "FREE" && tenant.notes.length >= 3) {
      throw new Error("Note limit reached. Please upgrade to Pro plan.");
    }

    return prisma.note.create({
      data: {
        title,
        content,
        userId,
        tenantId,
      },
    });
  }

  async findAll(tenantId: string) {
    return prisma.note.findMany({
      where: { tenantId },
      orderBy: { createdAt: "desc" },
    });
  }

  async findOne(id: string, tenantId: string) {
    const note = await prisma.note.findFirst({
      where: { id, tenantId },
    });

    if (!note) {
      throw new Error("Note not found");
    }

    return note;
  }

  async update(id: string, title: string, content: string, tenantId: string) {
    const note = await this.findOne(id, tenantId);

    return prisma.note.update({
      where: { id: note.id },
      data: { title, content },
    });
  }

  async delete(id: string, tenantId: string) {
    const note = await this.findOne(id, tenantId);

    return prisma.note.delete({
      where: { id: note.id },
    });
  }
}
