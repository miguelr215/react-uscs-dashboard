import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts, Link } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createContext, useState, useCallback, useEffect, useContext } from "react";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, ArcElement } from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const defaultDashboardContext = {
  products: [],
  categories: [],
  currentCategory: "All",
  loading: false,
  error: null,
  changeCurrentCategory: () => {
  },
  refresh: async () => {
  }
};
const DashboardContext = createContext(
  defaultDashboardContext
);
async function fetchProducts() {
  try {
    const res = await fetch("/data.json");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return { categories: [], products: [] };
  }
}
const DashboardProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [currentCategory, setCurrentCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const changeCurrentCategory = useCallback((category) => {
    setCurrentCategory(category);
  }, []);
  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts();
      setProducts(data.products);
      setCategories((prevState) => [...prevState, ...data.categories]);
    } catch (error2) {
      setError(error2 instanceof Error ? error2.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadData();
  }, []);
  const contextValue = {
    products,
    categories,
    currentCategory,
    loading,
    error,
    changeCurrentCategory,
    refresh: loadData
  };
  return /* @__PURE__ */ jsx(DashboardContext.Provider, { value: contextValue, children });
};
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,100..900;1,100..900&display=swap"
}, {
  rel: "stylesheet",
  href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [/* @__PURE__ */ jsx(DashboardProvider, {
        children
      }), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const LogoLink = () => {
  return /* @__PURE__ */ jsx(Link, { to: "/", className: "max-w-[125px] md:max-w-[155px]", "aria-description": "Go to Home Page", role: "button", children: /* @__PURE__ */ jsx("img", { src: "https://www.uscold.com/wp-content/uploads/2023/07/USCS_Logo_Horizontal_Email.png", alt: "US Cold Storage logo" }) });
};
const heroBg = "_heroBg_n1797_1";
const heroCta = "_heroCta_n1797_19";
const styles = {
  heroBg,
  heroCta
};
const Hero = () => {
  return /* @__PURE__ */ jsx("main", { className: `w-screen h-screen flex items-center justify-center ${styles.heroBg}`, children: /* @__PURE__ */ jsxs("div", { className: `min-w-[270px] bg-white rounded p-4 md:p-6 lg:p-9 text-center ${styles.heroCta}`, children: [
    /* @__PURE__ */ jsx("h1", { className: "text-base sm:text-2xl md:text-5xl mb-4 md:mb-6", children: "US Cold Storage Dashboard" }),
    /* @__PURE__ */ jsx(Link, { to: "/dashboard", className: "db-btn mx-auto", "aria-description": "Go to Main Dashboard", children: "Launch Dashboard" })
  ] }) });
};
const LoadingSpinner = () => {
  return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-screen bg-gray-100", children: /* @__PURE__ */ jsx("div", { className: "w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" }) });
};
const SidebarFooter = () => {
  return /* @__PURE__ */ jsxs("footer", { className: "flex items-center gap-2.5 pb-8 px-4", children: [
    /* @__PURE__ */ jsx("img", { src: "https://mrtech.dev/images/Ramos_Miguel2.jpg", alt: "User image - Miguel Ramos", className: "size-10 rounded-full aspect-square" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col max-w-[110px]", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-sm md:text-base font-semibold text-gray-900 truncate", children: "Miguel Ramos" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-xs font-normal truncate", children: "miguel@mrtech.dev" })
    ] }),
    /* @__PURE__ */ jsx(Link, { to: "/", "aria-label": "Logout", title: "Logout", children: /* @__PURE__ */ jsx("i", { className: "bi bi-box-arrow-left" }) })
  ] });
};
const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "mobile-sidebar md:hidden", children: [
      /* @__PURE__ */ jsxs("header", { className: "flex justify-between items-center p-4 border-b border-gray-300", children: [
        /* @__PURE__ */ jsx(LogoLink, {}),
        /* @__PURE__ */ jsx("button", { type: "button", className: "text-2xl cursor-pointer", onClick: () => setIsOpen(!isOpen), "aria-description": "Icon to open and close mobile navigation", children: /* @__PURE__ */ jsx("i", { className: "bi bi-list" }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: `fixed top-0 left-0 h-screen w-52 bg-gray-200 transform transition-transform duration-300 ${isOpen ? "translate-x-0 z-50" : "-translate-x-full"}`, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-full justify-between", children: [
        /* @__PURE__ */ jsxs("nav", { className: "flex flex-col p-4 gap-4", children: [
          /* @__PURE__ */ jsxs(Link, { to: "/", className: "db-nav-btn", onClick: () => setIsOpen(false), "aria-description": "Go to Home page", children: [
            /* @__PURE__ */ jsx("i", { className: "bi bi-house-door" }),
            " Home"
          ] }),
          /* @__PURE__ */ jsxs(Link, { to: "/dashboard", className: "db-nav-btn", onClick: () => setIsOpen(false), "aria-description": "Go to Main Dashboard page", children: [
            /* @__PURE__ */ jsx("i", { className: "bi bi-bar-chart-fill" }),
            " Dashboard"
          ] }),
          /* @__PURE__ */ jsxs(Link, { to: "/dashboard/inventory", className: "db-nav-btn", onClick: () => setIsOpen(false), "aria-description": "Go to Inventory Dashboard page", children: [
            /* @__PURE__ */ jsx("i", { className: "bi bi-boxes" }),
            "Inventory"
          ] }),
          /* @__PURE__ */ jsxs(Link, { to: "/dashboard/sales", className: "db-nav-btn", onClick: () => setIsOpen(false), "aria-description": "Go to Sales Dashboard page", children: [
            /* @__PURE__ */ jsx("i", { className: "bi bi-piggy-bank-fill" }),
            "Sales"
          ] })
        ] }),
        /* @__PURE__ */ jsx(SidebarFooter, {})
      ] }) })
    ] }),
    isOpen && /* @__PURE__ */ jsx(
      "div",
      {
        onClick: () => setIsOpen(false),
        className: "fixed inset-0 bg-black/50"
      }
    )
  ] });
};
const Sidebar = () => {
  return /* @__PURE__ */ jsx("aside", { className: "fixed w-full max-w-[13rem] h-screen shadow-2xl shadow-gray-500 hidden md:block", children: /* @__PURE__ */ jsxs("div", { className: `flex flex-col justify-between h-screen w-52 bg-gray-200 z-50`, children: [
    /* @__PURE__ */ jsxs("nav", { className: "flex flex-col p-4 gap-4", children: [
      /* @__PURE__ */ jsx(LogoLink, {}),
      /* @__PURE__ */ jsxs(Link, { to: "/dashboard", className: "db-nav-btn", "aria-description": "Go to Main Dashboard page", children: [
        /* @__PURE__ */ jsx("i", { className: "bi bi-bar-chart-fill" }),
        " Dashboard"
      ] }),
      /* @__PURE__ */ jsxs(Link, { to: "/dashboard/inventory", className: "db-nav-btn", "aria-description": "Go to Inventory Dashboard page", children: [
        /* @__PURE__ */ jsx("i", { className: "bi bi-boxes" }),
        "Inventory"
      ] }),
      /* @__PURE__ */ jsxs(Link, { to: "/dashboard/sales", className: "db-nav-btn", "aria-description": "Go to Sales Dashboard page", children: [
        /* @__PURE__ */ jsx("i", { className: "bi bi-piggy-bank-fill" }),
        "Sales"
      ] })
    ] }),
    /* @__PURE__ */ jsx(SidebarFooter, {})
  ] }) });
};
const Header = ({ title, description }) => {
  return /* @__PURE__ */ jsxs("header", { className: "mb-5 md:mb-7", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-1 md:text-4xl", children: title }),
    /* @__PURE__ */ jsx("p", { className: "text-base text-gray-600", children: description })
  ] });
};
function useData() {
  const context = useContext(DashboardContext);
  if (!context) throw new Error("useData must be used within a DataProvider");
  return context;
}
const CategoryFilter = () => {
  const { categories, currentCategory, changeCurrentCategory } = useData();
  return /* @__PURE__ */ jsxs("div", { className: "mb-4 md:mb-6", children: [
    /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mb-1 md:mb-2", children: "Filter by category:" }),
    /* @__PURE__ */ jsx("ul", { className: "flex flex-wrap gap-4 md:gap-5", children: categories.map((category) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: () => changeCurrentCategory(category),
        className: `db-cat-btn ${currentCategory === category ? "font-bold" : ""}`,
        "aria-description": `Button to filter by ${category}`,
        children: category
      }
    ) }, category)) })
  ] });
};
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const LineChart = ({ data }) => {
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Line, { data }) });
};
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const DoughnutChart = ({ data }) => {
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Doughnut, { data }) });
};
function meta$1({}) {
  return [{
    title: "Dashboard | US Cold Storage"
  }, {
    name: "description",
    content: "US Cold Storage Dashboard with inventory, sales & stats tracking created by Miguel Ramos with Vite, React Router, and Chartjs!"
  }];
}
const home = UNSAFE_withComponentProps(function Home() {
  return /* @__PURE__ */ jsx(Hero, {});
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
function meta({}) {
  return [{
    title: "Dashboard | US Cold Storage"
  }, {
    name: "description",
    content: "US Cold Storage Dashboard with inventory, sales & stats tracking created by Miguel Ramos with Vite, React Router, and Chartjs!"
  }];
}
const DashboardLayout = () => {
  return /* @__PURE__ */ jsxs("main", {
    className: "md:flex md:flex-row",
    children: [/* @__PURE__ */ jsx(MobileSidebar, {}), /* @__PURE__ */ jsx(Sidebar, {}), /* @__PURE__ */ jsx("aside", {
      className: "w-full p-4 md:px-9 md:pb-9 md:ml-[13rem]",
      children: /* @__PURE__ */ jsx(Outlet, {})
    })]
  });
};
const dashboardLayout = UNSAFE_withComponentProps(DashboardLayout);
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dashboardLayout,
  meta
}, Symbol.toStringTag, { value: "Module" }));
function useDoughnutChartFormat(chartLabel, chartData, chartCategories) {
  const colors = [
    "rgb(255, 99, 132)",
    "rgb(54, 162, 235)",
    "rgb(255, 205, 86)",
    "rgb(92, 205, 86)",
    "rgb(169, 82, 223)",
    "rgb(252, 169, 3)"
  ];
  const data = {
    labels: chartCategories,
    datasets: [
      {
        label: chartLabel,
        data: chartData,
        backgroundColor: colors.filter(
          (color, index) => index < chartCategories.length
        ),
        hoverOffset: 4
      }
    ]
  };
  return data;
}
function useCategoryFilter(products, currentCategory) {
  if (currentCategory === "All") {
    return products;
  }
  return products.filter((product) => product.category === currentCategory);
}
function useSalesAmt(products) {
  const salesAmtArr = products.map(
    (product) => product.sales.map((item) => item.amount)
  );
  return salesAmtArr;
}
function useSalesRevenue(products) {
  const salesRevArr = products.map(
    (product) => product.sales.map((item) => item.revenue)
  );
  return salesRevArr;
}
function useSumsOfArrays(arrays) {
  if (arrays.length === 0) {
    return [];
  }
  const result = arrays.reduce(
    (sum, arr) => sum.map((num, i) => num + (arr[i] ?? 0))
  );
  return result;
}
function useLineChartFormat(chartLabel, chartData) {
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const data = {
    labels,
    datasets: [
      {
        label: chartLabel,
        data: chartData,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)"
      }
    ]
  };
  return data;
}
function useDoughnutData(products, currentCategory) {
  const categoryMap = /* @__PURE__ */ new Map();
  if (currentCategory === "All") {
    products.forEach((product) => {
      categoryMap.set(
        product.category,
        (categoryMap.get(product.category) || 0) + product.quantity
      );
    });
    return Array.from(categoryMap.values());
  } else {
    products.forEach((product) => {
      if (product.category === currentCategory) {
        categoryMap.set(
          product.name,
          (categoryMap.get(product.name) || 0) + product.quantity
        );
      }
    });
    return Array.from(categoryMap.values());
  }
}
function useDoughnutCatLabels(products, currentCategory) {
  const categoryMap = /* @__PURE__ */ new Map();
  products.forEach((product) => {
    if (product.category === currentCategory) {
      categoryMap.set(
        product.name,
        (categoryMap.get(product.name) || 0) + product.quantity
      );
    }
  });
  return Array.from(categoryMap.keys());
}
const Dashboard = () => {
  const [lineAmtChartData, setLineAmtChartData] = useState(null);
  const [lineRevChartData, setLineRevChartData] = useState(null);
  const [doughnutChartData, setDoughnutChartData] = useState(null);
  const {
    products,
    categories,
    currentCategory,
    loading,
    error
  } = useData();
  useEffect(() => {
    const filteredProducts = useCategoryFilter(products, currentCategory);
    const salesAmtArrNumsArr = useSalesAmt(filteredProducts);
    const salesRevArrNumsArr = useSalesRevenue(filteredProducts);
    const salesAmtArrTotals = useSumsOfArrays(salesAmtArrNumsArr);
    const salesRevArrTotals = useSumsOfArrays(salesRevArrNumsArr);
    const salesAmtChartDataFormatted = useLineChartFormat(`12 Month Sales Amount for ${currentCategory}`, salesAmtArrTotals);
    const salesRevChartDataFormatted = useLineChartFormat(`12 Month Sales Revenue $ for ${currentCategory}`, salesRevArrTotals);
    const doughnutChartDataArr = useDoughnutData(filteredProducts, currentCategory);
    const doughnutLabels = currentCategory === "All" ? categories.slice(1) : useDoughnutCatLabels(filteredProducts, currentCategory);
    const doughnutChartDataFormatted = useDoughnutChartFormat(`Current Inventory for ${currentCategory}`, doughnutChartDataArr, doughnutLabels);
    setLineAmtChartData(salesAmtChartDataFormatted);
    setLineRevChartData(salesRevChartDataFormatted);
    setDoughnutChartData(doughnutChartDataFormatted);
  }, [products, currentCategory]);
  if (loading) return /* @__PURE__ */ jsx(LoadingSpinner, {});
  if (error) return /* @__PURE__ */ jsxs("p", {
    className: "text-red-500",
    children: ["Error: ", error]
  });
  return /* @__PURE__ */ jsxs("section", {
    children: [/* @__PURE__ */ jsx(Header, {
      title: "Dashboard",
      description: "View Popular Inventory & Sales Dashboards"
    }), /* @__PURE__ */ jsx(CategoryFilter, {}), /* @__PURE__ */ jsxs("div", {
      className: "flex flex-col gap-6 items-center lg:flex-row",
      children: [doughnutChartData ? /* @__PURE__ */ jsxs("div", {
        className: "w-full max-w-xl lg:max-w-lg",
        children: [/* @__PURE__ */ jsx("p", {
          className: "text-center text-xs text-gray-700 lg:text-left lg:pl-10",
          children: "Current Inventory:"
        }), /* @__PURE__ */ jsx(DoughnutChart, {
          data: doughnutChartData
        })]
      }) : /* @__PURE__ */ jsx(LoadingSpinner, {}), /* @__PURE__ */ jsxs("div", {
        className: "flex flex-col gap-6",
        children: [lineAmtChartData ? /* @__PURE__ */ jsx("div", {
          className: "w-full max-w-xl",
          children: /* @__PURE__ */ jsx(LineChart, {
            data: lineAmtChartData
          })
        }) : /* @__PURE__ */ jsx(LoadingSpinner, {}), lineRevChartData ? /* @__PURE__ */ jsx("div", {
          className: "w-full max-w-xl",
          children: /* @__PURE__ */ jsx(LineChart, {
            data: lineRevChartData
          })
        }) : /* @__PURE__ */ jsx(LoadingSpinner, {})]
      })]
    })]
  });
};
const dashboard = UNSAFE_withComponentProps(Dashboard);
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dashboard
}, Symbol.toStringTag, { value: "Module" }));
function useInventory(products) {
  const inventoryArr = products.map(
    (product) => product.inventoryByMonth.map((item) => item.amount)
  );
  return inventoryArr;
}
function useDeltaCalc(array) {
  const deltas = array.slice(1).map((num, i) => (num - array[i]) / array[i] * 100);
  deltas.unshift(0);
  return deltas;
}
const Inventory = () => {
  const [lineChartData, setLineChartData] = useState(null);
  const [deltaLineChartData, setDeltaLineChartData] = useState(null);
  const [doughnutChartData, setDoughnutChartData] = useState(null);
  const {
    products,
    categories,
    currentCategory,
    loading,
    error
  } = useData();
  useEffect(() => {
    const filteredProducts = useCategoryFilter(products, currentCategory);
    const inventoryArrNumsArr = useInventory(filteredProducts);
    const inventoryArrTotals = useSumsOfArrays(inventoryArrNumsArr);
    const chartDataFormatted = useLineChartFormat(`12 Month Inventory for ${currentCategory}`, inventoryArrTotals);
    const deltaInventoryArr = useDeltaCalc(inventoryArrTotals);
    const deltaChartDataFormatted = useLineChartFormat(`Month-to-Month % Change in Inventory for ${currentCategory}`, deltaInventoryArr);
    const doughnutChartDataArr = useDoughnutData(filteredProducts, currentCategory);
    const doughnutLabels = currentCategory === "All" ? categories.slice(1) : useDoughnutCatLabels(filteredProducts, currentCategory);
    const doughnutChartDataFormatted = useDoughnutChartFormat(`Current Inventory for ${currentCategory}`, doughnutChartDataArr, doughnutLabels);
    setLineChartData(chartDataFormatted);
    setDeltaLineChartData(deltaChartDataFormatted);
    setDoughnutChartData(doughnutChartDataFormatted);
  }, [products, currentCategory]);
  if (loading) return /* @__PURE__ */ jsx(LoadingSpinner, {});
  if (error) return /* @__PURE__ */ jsxs("p", {
    className: "text-red-500",
    children: ["Error: ", error]
  });
  return /* @__PURE__ */ jsxs("section", {
    children: [/* @__PURE__ */ jsx(Header, {
      title: "Inventory",
      description: "View inventory stats to make informed decisions"
    }), /* @__PURE__ */ jsx(CategoryFilter, {}), /* @__PURE__ */ jsxs("div", {
      className: "flex flex-col gap-6 items-center lg:flex-row",
      children: [doughnutChartData ? /* @__PURE__ */ jsx("div", {
        className: "w-full max-w-xl lg:max-w-lg",
        children: /* @__PURE__ */ jsx(DoughnutChart, {
          data: doughnutChartData
        })
      }) : /* @__PURE__ */ jsx(LoadingSpinner, {}), /* @__PURE__ */ jsxs("div", {
        className: "flex flex-col gap-6",
        children: [lineChartData ? /* @__PURE__ */ jsx("div", {
          className: "w-full max-w-xl",
          children: /* @__PURE__ */ jsx(LineChart, {
            data: lineChartData
          })
        }) : /* @__PURE__ */ jsx(LoadingSpinner, {}), deltaLineChartData ? /* @__PURE__ */ jsx("div", {
          className: "w-full max-w-xl",
          children: /* @__PURE__ */ jsx(LineChart, {
            data: deltaLineChartData
          })
        }) : /* @__PURE__ */ jsx(LoadingSpinner, {})]
      })]
    })]
  });
};
const inventory = UNSAFE_withComponentProps(Inventory);
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: inventory
}, Symbol.toStringTag, { value: "Module" }));
function useDoughnutSaleRevData(products, currentCategory) {
  const categoryMap = /* @__PURE__ */ new Map();
  if (currentCategory === "All") {
    products.forEach((product) => {
      const totalRev = product.sales.reduce(
        (sum, item) => sum + item.revenue,
        0
      );
      categoryMap.set(
        product.category,
        (categoryMap.get(product.category) || 0) + totalRev
      );
    });
    return Array.from(categoryMap.values());
  } else {
    products.forEach((product) => {
      if (product.category === currentCategory) {
        const totalRev = product.sales.reduce(
          (sum, item) => sum + item.revenue,
          0
        );
        categoryMap.set(
          product.name,
          (categoryMap.get(product.name) || 0) + totalRev
        );
      }
    });
    return Array.from(categoryMap.values());
  }
}
const Sales = () => {
  const [lineAmtChartData, setLineAmtChartData] = useState(null);
  const [lineRevChartData, setLineRevChartData] = useState(null);
  const [doughnutChartData, setDoughnutChartData] = useState(null);
  const {
    products,
    categories,
    currentCategory,
    loading,
    error
  } = useData();
  useEffect(() => {
    const filteredProducts = useCategoryFilter(products, currentCategory);
    const salesAmtArrNumsArr = useSalesAmt(filteredProducts);
    const salesRevArrNumsArr = useSalesRevenue(filteredProducts);
    const salesAmtArrTotals = useSumsOfArrays(salesAmtArrNumsArr);
    const salesRevArrTotals = useSumsOfArrays(salesRevArrNumsArr);
    const salesAmtChartDataFormatted = useLineChartFormat(`12 Month Sales Amount for ${currentCategory}`, salesAmtArrTotals);
    const salesRevChartDataFormatted = useLineChartFormat(`12 Month Sales Revenue $ for ${currentCategory}`, salesRevArrTotals);
    const saleRevDoughnutChartDataArr = useDoughnutSaleRevData(filteredProducts, currentCategory);
    const doughnutLabels = currentCategory === "All" ? categories.slice(1) : useDoughnutCatLabels(filteredProducts, currentCategory);
    const doughnutChartDataFormatted = useDoughnutChartFormat(`Total Sales Revenue for ${currentCategory}`, saleRevDoughnutChartDataArr, doughnutLabels);
    setLineAmtChartData(salesAmtChartDataFormatted);
    setLineRevChartData(salesRevChartDataFormatted);
    setDoughnutChartData(doughnutChartDataFormatted);
  }, [products, currentCategory]);
  if (loading) return /* @__PURE__ */ jsx(LoadingSpinner, {});
  if (error) return /* @__PURE__ */ jsxs("p", {
    className: "text-red-500",
    children: ["Error: ", error]
  });
  return /* @__PURE__ */ jsxs("section", {
    children: [/* @__PURE__ */ jsx(Header, {
      title: "Sales",
      description: "View Sales & Revenue stats to understand your financial situation"
    }), /* @__PURE__ */ jsx(CategoryFilter, {}), /* @__PURE__ */ jsxs("div", {
      className: "flex flex-col gap-6 items-center lg:flex-row",
      children: [doughnutChartData ? /* @__PURE__ */ jsx("div", {
        className: "w-full max-w-xl lg:max-w-lg",
        children: /* @__PURE__ */ jsx(DoughnutChart, {
          data: doughnutChartData
        })
      }) : /* @__PURE__ */ jsx(LoadingSpinner, {}), /* @__PURE__ */ jsxs("div", {
        className: "flex flex-col gap-6",
        children: [lineAmtChartData ? /* @__PURE__ */ jsx("div", {
          className: "w-full max-w-xl",
          children: /* @__PURE__ */ jsx(LineChart, {
            data: lineAmtChartData
          })
        }) : /* @__PURE__ */ jsx(LoadingSpinner, {}), lineRevChartData ? /* @__PURE__ */ jsx("div", {
          className: "w-full max-w-xl",
          children: /* @__PURE__ */ jsx(LineChart, {
            data: lineRevChartData
          })
        }) : /* @__PURE__ */ jsx(LoadingSpinner, {})]
      })]
    })]
  });
};
const sales = UNSAFE_withComponentProps(Sales);
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sales
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/react-uscs-dashboard/assets/entry.client-n1iw2mYZ.js", "imports": ["/react-uscs-dashboard/assets/chunk-OIYGIGL5-CMUvuLFw.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/react-uscs-dashboard/assets/root-B_5tfm7e.js", "imports": ["/react-uscs-dashboard/assets/chunk-OIYGIGL5-CMUvuLFw.js", "/react-uscs-dashboard/assets/DashboardContext-CplvL782.js"], "css": ["/react-uscs-dashboard/assets/root-QS0Enss6.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/react-uscs-dashboard/assets/home-D3rIYLw6.js", "imports": ["/react-uscs-dashboard/assets/chunk-OIYGIGL5-CMUvuLFw.js", "/react-uscs-dashboard/assets/DashboardContext-CplvL782.js", "/react-uscs-dashboard/assets/DoughnutChart-BBMBpI14.js"], "css": ["/react-uscs-dashboard/assets/home-Drn5l6Py.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/dashboard/dashboard-layout": { "id": "routes/dashboard/dashboard-layout", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/react-uscs-dashboard/assets/dashboard-layout-DWxluLAl.js", "imports": ["/react-uscs-dashboard/assets/chunk-OIYGIGL5-CMUvuLFw.js", "/react-uscs-dashboard/assets/DashboardContext-CplvL782.js", "/react-uscs-dashboard/assets/DoughnutChart-BBMBpI14.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/dashboard/dashboard": { "id": "routes/dashboard/dashboard", "parentId": "routes/dashboard/dashboard-layout", "path": "dashboard", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/react-uscs-dashboard/assets/dashboard-BOt6wVmZ.js", "imports": ["/react-uscs-dashboard/assets/chunk-OIYGIGL5-CMUvuLFw.js", "/react-uscs-dashboard/assets/useDoughnutCatLabels-D4R5Edbk.js", "/react-uscs-dashboard/assets/DoughnutChart-BBMBpI14.js", "/react-uscs-dashboard/assets/useSalesRevenue-C38dtXeY.js", "/react-uscs-dashboard/assets/useDoughnutData-BsXcun6D.js", "/react-uscs-dashboard/assets/DashboardContext-CplvL782.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/dashboard/inventory": { "id": "routes/dashboard/inventory", "parentId": "routes/dashboard/dashboard-layout", "path": "dashboard/inventory", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/react-uscs-dashboard/assets/inventory-C-ijwBMT.js", "imports": ["/react-uscs-dashboard/assets/chunk-OIYGIGL5-CMUvuLFw.js", "/react-uscs-dashboard/assets/useDoughnutCatLabels-D4R5Edbk.js", "/react-uscs-dashboard/assets/DoughnutChart-BBMBpI14.js", "/react-uscs-dashboard/assets/useDoughnutData-BsXcun6D.js", "/react-uscs-dashboard/assets/DashboardContext-CplvL782.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/dashboard/sales": { "id": "routes/dashboard/sales", "parentId": "routes/dashboard/dashboard-layout", "path": "dashboard/sales", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/react-uscs-dashboard/assets/sales-BWl98f9H.js", "imports": ["/react-uscs-dashboard/assets/chunk-OIYGIGL5-CMUvuLFw.js", "/react-uscs-dashboard/assets/useDoughnutCatLabels-D4R5Edbk.js", "/react-uscs-dashboard/assets/DoughnutChart-BBMBpI14.js", "/react-uscs-dashboard/assets/useSalesRevenue-C38dtXeY.js", "/react-uscs-dashboard/assets/DashboardContext-CplvL782.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/react-uscs-dashboard/assets/manifest-21a565ae.js", "version": "21a565ae", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v8_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/react-uscs-dashboard/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/dashboard/dashboard-layout": {
    id: "routes/dashboard/dashboard-layout",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/dashboard/dashboard": {
    id: "routes/dashboard/dashboard",
    parentId: "routes/dashboard/dashboard-layout",
    path: "dashboard",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/dashboard/inventory": {
    id: "routes/dashboard/inventory",
    parentId: "routes/dashboard/dashboard-layout",
    path: "dashboard/inventory",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/dashboard/sales": {
    id: "routes/dashboard/sales",
    parentId: "routes/dashboard/dashboard-layout",
    path: "dashboard/sales",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
