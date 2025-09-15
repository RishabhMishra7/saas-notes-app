import { Router } from "express";
import { AuthRequest } from "../types";
import { authenticate, requireAdmin } from "../middleware/auth";
import { TenantService } from "../services/tenant.service";

const router = Router();
const tenantService = new TenantService();

router.use(authenticate);

router.post(
  "/tenants/:slug/upgrade",
  requireAdmin,
  async (req: AuthRequest, res) => {
    try {
      const tenant = await tenantService.upgradeToPro(req.params.slug);
      res.json({ message: "Tenant upgraded to Pro plan", tenant });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
);

export default router;
