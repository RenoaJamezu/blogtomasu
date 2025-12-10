import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { apiUrl } from "../utils/api";
import toast from "react-hot-toast";

interface Blog {
  _id: string;
  title: string;
  content: string;
  author: {
    name: string,
    email: string,
  };
  createdAt: string;
  updatedAt: string;
}

interface BlogContextType {
  blogs: Blog[];
  loading: boolean;
  fetchBlogs: () => Promise<void>;
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  keyword: string;
  setKeyword: (kw: string) => void;
  filters: Record<string, string>;
  setFilters: (filters: Record<string, string>) => void;
  limit: number;
  setLimit: (limit: number) => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export function BlogProvider({ children }: { children: ReactNode }) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(6);
  const [keyword, setKeyword] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("limit", limit.toString());
      if (keyword) params.append("keyword", keyword);
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      const res = await fetch(`${apiUrl}/api/blogs?${params.toString()}`);
      const data = await res.json();

      if (!res.ok) {
        setBlogs([]);
        toast.error(data.message || "Failed to fetch blogs");
        return;
      }

      setBlogs(data.blogs);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
      setBlogs([]);
      toast.error("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  }, [page, limit, keyword, filters]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const value = useMemo(() => ({
    blogs,
    loading,
    fetchBlogs,
    page,
    setPage,
    totalPages,
    keyword,
    setKeyword,
    filters,
    setFilters,
    limit,
    setLimit
  }), [blogs, loading, fetchBlogs, page, totalPages, keyword, filters, limit]);

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  );
}

export { BlogContext };