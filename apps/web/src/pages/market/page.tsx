import { useNavigate } from "react-router-dom";
import * as S from './style';
import Dice from "@/app/assets/dice.svg?react";
import Audio from "@/app/assets/audio.svg?react";
import Star from "@/app/assets/star.svg?react";
import Book from "@/app/assets/book.svg?react";
import Music from "@/app/assets/music.svg?react";
import Stars from "@/app/assets/stars.svg?react";
import Game from "@/app/assets/game.svg?react";
import { CategoryBox } from "./ui/category-box";
import { TagBox } from "./ui/tag-box";
import { ProductCard } from "./ui/product-card";
import { useState } from "react";
import { Product } from "@/entities/product/model/type";
import { TabTitleText } from "@/shared/ui/tab-title-text";

export const Market = () => {
  const navigate = useNavigate();
  const categoryList = [
    { text: "3D 모델", icon: Dice },
    { text: "오디오 굿즈", icon: Audio },
    { text: "굿즈", icon: Star },
    { text: "소설 및 만화", icon: Book },
    { text: "소설 및 만화", icon: Book },
    { text: "소설 및 만화", icon: Book },
    { text: "소설 및 만화", icon: Book },
    { text: "소설 및 만화", icon: Book },
    { text: "소설 및 만화", icon: Book },
    { text: "소설 및 만화", icon: Book },
    { text: "소설 및 만화", icon: Book },
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
    "애니메이션",
    "애니메이션",
    "애니메이션",
    "애니메이션",
    "애니메이션",
    "애니메이션",
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
    { seller: "이기찬",id: "1", name: "귀여운 VTuber 굿즈", price: 12000, image: "https://picsum.photos/200" },
    { seller: "이상은",id: "2", name: "3D 모델링 캐릭터", price: 30000, image: "https://picsum.photos/350" },
    { seller: "김민규",id: "3", name: "한정판 일러스트 인데 이게 정말 좋은 희귀한 한정판 일러스트입니다. 진짜 대박이에요", price: 18000, image: "https://picsum.photos/400" },
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
    <S.MarketContainer>
      <TabTitleText>카테고리</TabTitleText>
      <S.CategoryWrapper>
        {categoryList.map((c, idx) => (
          <CategoryBox key={idx} text={c.text} Icon={c.icon} />
        ))}
      </S.CategoryWrapper>
      
	    <TabTitleText>인기 태그</TabTitleText>
      <S.TagWrapper>
        {tagList.map((t, idx) => (
          <TagBox key={idx} text={t} />
        ))}
      </S.TagWrapper>
	    
      <TabTitleText>마켓 인기 상품</TabTitleText>
      <S.ProductWrapper>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            title={product.name}
            price={product.price}
            seller={product.seller}
            onClick={() =>
                navigate("/market-detail", { state: product })
            }
          />
        ))}
      </S.ProductWrapper>
    </S.MarketContainer>
  );
};
