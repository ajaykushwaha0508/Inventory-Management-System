import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";

import Topbar from "../components/topbar/Topbar";
import CategoriesHeader from "../components/categories/CategoriesHeader";
import CategoriesToolbar from "../components/categories/CategoriesToolbar";
import CategoryTable from "../components/categories/CategoryTable";
import CreateCategoryModal from "../components/categories/CreateCategoryModal";

import {
  fetchCategories,
  createCategory,
  updateCategory,
} from "../services/category.service";

export default function Categories() {
  const [view, setView] = useState("list");
  const [categories, setCategories] = useState([]);
  const [modalCategory, setModalCategory] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  // Fetch categories
  const loadCategories = async () => {
    try {
      setIsLoading(true);

      const response = await fetchCategories();

      setCategories(response.data?.categories || []);
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch categories.";

      enqueueSnackbar(message, {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch categories when page loads
  useEffect(() => {
    loadCategories();
  }, []);

  // Open create modal
  const openCreateModal = () => {
    setModalCategory(null);
    setModalOpen(true);
  };

  // Open edit modal
  const openEditModal = (category) => {
    setModalCategory(category);
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    setModalCategory(null);
  };

  // Create / Update category
  const handleSubmit = async (values, original) => {
    try {
      if (original) {
        // Update category
        const response = await updateCategory(original._id, {
          name: values.name,
          description: values.description,
        });

        enqueueSnackbar(response.message || "Category updated successfully!", {
          variant: "success",
        });
      } else {
        // Create category
        const response = await createCategory({
          name: values.name,
          description: values.description,
        });

        enqueueSnackbar(response.message || "Category created successfully!", {
          variant: "success",
        });
      }

      // Refresh categories
      await loadCategories();

      // Close modal
      closeModal();
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";

      enqueueSnackbar(message, {
        variant: "error",
      });
    }
  };
  console.log(categories);
  return (
    <>
      <Topbar onAddProduct={() => console.log("add product clicked")} />

      <main className="flex-1 p-6">
        <CategoriesHeader
          total={categories.length}
          changeLabel="+2 this quarter"
        />

        <CategoriesToolbar
          view={view}
          onViewChange={setView}
          onSearch={(query) => console.log("search:", query)}
          onDepartmentChange={(dept) => console.log("department:", dept)}
          onCreateCategory={openCreateModal}
        />

        <CategoryTable
          onEdit={openEditModal}
          onShowDetails={(category) => console.log("details:", category._id)}
          categories={categories}
          isLoading={isLoading}
        />
      </main>

      <CreateCategoryModal
        open={modalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        category={modalCategory}
      />
    </>
  );
}
