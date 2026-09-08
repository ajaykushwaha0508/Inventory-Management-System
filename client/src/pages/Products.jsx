import { useEffect, useMemo, useState } from "react";

import Header from "../components/products/Header.jsx";
import StatsCards from "../components/products/StatsCards.jsx";
import FilterTabs from "../components/products/FilterTabs.jsx";
import Toolbar from "../components/products/Toolbar.jsx";
import ProductTable from "../components/products/ProductTable.jsx";
import Pagination from "../components/products/Pagination.jsx";
import AddProductModal from "../components/products/AddProductModal.jsx";
import UpdateProductModal from "../components/products/UpdateProductModal.jsx";

import { fetchCategories } from "../services/category.service.js";
import {
  createProduct,
  fetchProducts,
  updateProduct,
} from "../services/product.service.js";

import { useSnackbar } from "notistack";

const statusForTab = {
  "in-stock": "IN_STOCK",
  "low-stock": "LOW_STOCK",
  "out-of-stock": "OUT_OF_STOCK",
};

export const stats = [
  {
    label: "Total Items",
    value: "1,842",
    delta: "",
    tone: "brand",
  },
  {
    label: "In Stock Items",
    value: "1,825",
    delta: "",
    tone: "green",
  },
  {
    label: "Critical Low Stock",
    value: "14",
    delta: "Needs immediate reorder",
    tone: "amber",
  },
  {
    label: "Out of Stock",
    value: "3",
    delta: "Requires restocking",
    tone: "red",
  },
];

const PAGE_SIZE = 10;

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [query, setQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [page, setPage] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  // Fetch products
  const loadProducts = async () => {
    try {
      setIsLoading(true);

      const response = await fetchProducts();

      setProducts(response.data?.products || []);
    } catch (error) {
      enqueueSnackbar(
        error.response?.data?.message || "Failed to load products.",
        {
          variant: "error",
        },
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);

        const [productsResponse, categoriesResponse] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ]);

        setProducts(productsResponse.data?.products || []);

        setCategories(categoriesResponse.data?.categories || []);
      } catch (error) {
        enqueueSnackbar(
          error.response?.data?.message || "Failed to load inventory data.",
          {
            variant: "error",
          },
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const tabCounts = useMemo(
    () => ({
      all: products.length,

      "in-stock": products.filter((p) => p.status === "IN_STOCK").length,

      "low-stock": products.filter((p) => p.status === "LOW_STOCK").length,

      "out-of-stock": products.filter((p) => p.status === "OUT_OF_STOCK")
        .length,
    }),
    [products],
  );

  // Filter products
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesTab =
        activeTab === "all" || product.status === statusForTab[activeTab];

      const matchesQuery =
        !q ||
        product.name?.toLowerCase().includes(q) ||
        product.sku?.toLowerCase().includes(q) ||
        product.supplierName?.toLowerCase().includes(q);

      return matchesTab && matchesQuery;
    });
  }, [products, activeTab, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [totalPages, page]);

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;

    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  // Select / deselect row
  const toggleRow = (id) => {
    setSelectedIds((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id],
    );
  };

  // Select / deselect all visible rows
  const toggleAll = (checked) => {
    setSelectedIds(checked ? paginated.map((product) => product._id) : []);
  };

  // Deselect everything
  const deselectAll = () => {
    setSelectedIds([]);
  };

  // Create product
  const handleCreateProduct = async (values) => {
    try {
      const response = await createProduct(values);

      enqueueSnackbar(response.message || "Product created successfully!", {
        variant: "success",
      });

      await loadProducts();

      setModalOpen(false);
    } catch (error) {
      enqueueSnackbar(
        error.response?.data?.message ||
          "Failed to create product. Please try again.",
        {
          variant: "error",
        },
      );
    }
  };

  // Open update modal
  const handleOpenUpdateProduct = (product) => {
    setSelectedProduct(product);
    setIsUpdateModalOpen(true);
  };

  // Update product
  const handleUpdateProduct = async (values) => {
    if (!selectedProduct?._id) {
      enqueueSnackbar("Product not found.", {
        variant: "error",
      });

      return;
    }

    try {
      setIsLoading(true);

      const response = await updateProduct(selectedProduct._id, values);

      enqueueSnackbar(response.message || "Product updated successfully!", {
        variant: "success",
      });

      await loadProducts();

      setIsUpdateModalOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      enqueueSnackbar(
        error.response?.data?.message ||
          "Failed to update product. Please try again.",
        {
          variant: "error",
        },
      );
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSelected = () => {
    setSelectedIds([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-10">
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <Header addProduct={() => setModalOpen(true)} />

        {/* Stats */}
        <div className="mt-6">
          <StatsCards stats={stats} />
        </div>

        {/* Product Section */}
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4">
          {/* Filter Tabs */}
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <FilterTabs
              active={activeTab}
              counts={tabCounts}
              onChange={(tab) => {
                setActiveTab(tab);
                setPage(1);
              }}
            />
          </div>

          {/* Toolbar */}
          <Toolbar
            query={query}
            onQueryChange={(value) => {
              setQuery(value);
              setPage(1);
            }}
            selectedCount={selectedIds.length}
            onDeselectAll={deselectAll}
            onDeleteSelected={deleteSelected}
          />

          {/* Product Table */}
          <div className="mt-4">
            <ProductTable
              products={paginated}
              selectedIds={selectedIds}
              onToggleRow={toggleRow}
              onToggleAll={toggleAll}
              onEdit={handleOpenUpdateProduct}
              isLoading={isLoading}
            />
          </div>

          {/* Pagination */}
          <Pagination
            page={page}
            totalPages={totalPages}
            totalItems={filtered.length}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
          />

          {/* Add Product Modal */}
          <AddProductModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            onSubmit={handleCreateProduct}
            categories={categories}
          />

          {/* Update Product Modal */}
          <UpdateProductModal
            open={isUpdateModalOpen}
            onClose={() => {
              setIsUpdateModalOpen(false);
              setSelectedProduct(null);
            }}
            product={selectedProduct}
            categories={categories}
            onSubmit={handleUpdateProduct}
          />
        </div>
      </div>
    </div>
  );
}
