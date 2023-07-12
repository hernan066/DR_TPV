import { useGetCategoriesQuery } from "../api/apiCategory";
import Loading from "../components/loading/Loading";
import { useGetOfertWithCategoryQuery } from "../api/apiOfert";
import { HomeLayout } from "../components/homeLayout/HomeLayout";
import { Categories } from "../components/categories/Categories";

export const HomePage = () => {
  const {
    data: categoriesData,
    isLoading: l1,
    isError: e1,
  } = useGetCategoriesQuery();
  const {
    data: ofertsData,
    isLoading: l2,
    isError: e2,
  } = useGetOfertWithCategoryQuery();

  return (
    <>
      {(l1 || l2) && <Loading />}
      {(e1 || e2) && <p>Ha ocurrido un error</p>}
      {categoriesData && ofertsData && (
        <HomeLayout>
          <Categories
            categories={categoriesData.categories}
            oferts={ofertsData.data.oferts}
          />
        </HomeLayout>
      )}
    </>
  );
};
