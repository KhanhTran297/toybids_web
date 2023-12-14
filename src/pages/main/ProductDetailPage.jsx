import React from "react";
import Product from "../../components/product/Product";
import PrestigeBuyer from "../../components/product/PrestigeBuyer";
import DescriptionProduct from "../../components/product/DescriptionProduct";
import { useParams } from "react-router-dom";
import { getDetailAuctionById } from "../../api/product";
import { useQuery } from "@tanstack/react-query";
import ProductDetail from "../../components/product/ProductDetail";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { data: detailAuction } = useQuery({
    queryKey: ["detailAuction", productId],
    queryFn: getDetailAuctionById,
    enabled: !!productId,
  });
  return (
    <div className="pt-[120px] w-full items-center justify-center flex flex-col gap-6">
      <div className="flex flex-row items-center justify-center w-full gap-6">
        <Product
          mainImage={detailAuction?.data?.product?.mainImage}
          subImage1={detailAuction?.data?.product?.subImage1}
          subImage2={detailAuction?.data?.product?.subImage2}
          subImage3={detailAuction?.data?.product?.subImage3}
        />
        <ProductDetail
          categoryName={detailAuction?.data?.product?.category?.categoryName}
          currentPrice={detailAuction?.data?.currentPrice}
          productName={detailAuction?.data?.product?.name}
          endDate={detailAuction?.data?.endDate}
          startDate={detailAuction?.data?.startDate}
        />
      </div>
      <DescriptionProduct
        des={detailAuction?.data?.product?.description}
        idAuction={detailAuction?.data?.id}
      />
      <PrestigeBuyer
        idBuyer={detailAuction?.data?.seller?.id}
        name={detailAuction?.data?.seller?.fullName}
        avt={detailAuction?.data?.seller?.avatar}
      />
    </div>
  );
};

export default ProductDetailPage;
