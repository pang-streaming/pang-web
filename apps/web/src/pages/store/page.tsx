import { useNavigate } from "react-router-dom";
import * as S from './style';
import Dice from "@/app/assets/dice.svg";
import Audio from "@/app/assets/audio.svg";
import Star from "@/app/assets/star.svg";
import Book from "@/app/assets/book.svg";
import Music from "@/app/assets/music.svg";
import Stars from "@/app/assets/stars.svg";
import Game from "@/app/assets/game.svg";
import { CategoryBox } from "./ui/category-box";
import { TagBox } from "./ui/tag-box";
import { ProductCard } from "./ui/product-card";
import { useEffect, useState } from "react";
import { Product } from "@/entities/product/model/type";
import { TabTitleText } from "@/shared/ui/tab-title-text";
// import { fetchProducts } from "@/entities/product/api";

export const Store = () => {
  const navigate = useNavigate();
  const categoryList = [
    { text: "3D 모델", icon: Dice },
    { text: "오디오 굿즈", icon: Audio },
    { text: "굿즈", icon: Star },
    { text: "소설 및 만화", icon: Book },
    { text: "음악", icon: Music },
    { text: "일러스트", icon: Stars },
    { text: "게임", icon: Game },
    { text: "기타" },
  ];

  const tagList: string[] = [
    "VTuber",
    "3D 모델링",
    "애니메이션",
    "커스텀캐릭터",
    "보컬로이드",
    "게임 캐릭터",
    "만화",
    "일러스트",
    "팬아트",
    "캐릭터 굿즈",
    "VR/AR 콘텐츠",
    "모션 캡처",
    "디지털 아트",
    "인디 게임",
  ];


  const dummyProducts: Product[] = [
    { id: "1", name: "귀여운 VTuber 굿즈", price: 12000, image: "https://picsum.photos/200" },
    { id: "2", name: "3D 모델링 캐릭터", price: 30000, image: "https://picsum.photos/350" },
    { id: "3", name: "한정판 일러스트", price: 18000, image: "https://picsum.photos/400" },
  ];

  const [products, setProducts] = useState<Product[]>(dummyProducts);

  /*
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetchProducts();
        console.log("fetchProducts 응답:", res);
        setProducts(res.data.data); 
      } catch (err) {
        console.error("상품 불러오기 실패:", err);
      }
    };
    loadProducts();
  }, []);
  */

  return (
    <S.Container>
      <TabTitleText>카테고리</TabTitleText>
      <S.CategoryGrid>
        {categoryList.map((c, idx) => (
          <CategoryBox key={idx} text={c.text} icon={c.icon} />
        ))}
      </S.CategoryGrid>
      <TabTitleText>인기 태그</TabTitleText>

      <S.TagGrid>
        {tagList.map((t, idx) => (
          <TagBox key={idx} text={t} />
        ))}
      </S.TagGrid>
      <TabTitleText>마켓 인기 상품</TabTitleText>

      <S.ProductGrid>
        {products.map((p) => (
          <ProductCard
            key={p.id}
            image={p.image}
            title={p.name}
            price={p.price}
            onClick={() =>
                navigate("/store-detail", { state: p })
            }
          />
        ))}
      </S.ProductGrid>
    </S.Container>
  );
};
