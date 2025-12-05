import { Router } from "express";
import { 
  createBlog,
  deleteBlog,
  getBlog,
  listBlogs, 
  updateBlog
} from "../controllers/blog.controller";
import { requireAuth } from "../middlewares/auth.middleware";
import { upload } from "../utils/uploader";

const router = Router()

router.route('/')
  .get(listBlogs)
  .post(requireAuth, upload.single("image"), createBlog);

router.route('/:id')
  .get(getBlog)
  .put(requireAuth, upload.single("image"), updateBlog)
  .delete(requireAuth, deleteBlog)

export default router;