import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class TenantService {
  async upgradeToPro(slug: string) {
    const tenant = await prisma.tenant.findUnique({
      where: { slug },
    });

    if (!tenant) {
      throw new Error("Tenant not found");
    }

    if (tenant.plan === "PRO") {
      throw new Error("Tenant is already on Pro plan");
    }

    return prisma.tenant.update({
      where: { slug },
      data: { plan: "PRO" },
    });
  }
}
