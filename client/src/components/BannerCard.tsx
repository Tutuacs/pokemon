import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import "../app/bannerCard.css";
import BannerCardButton from "./BannerCardButton";

type BannerCardProps = {
  bannerImage: string;
  width?: number;
  height?: number;
  type?: string;
};

export default function BannerCard({
  bannerImage,
  width = 800,
  type = "normal",
  height = 500,
}: BannerCardProps) {
  return (
    <main>
      <div className="justify-center items-center flex h-screen">
        {/* Flex container for centering */}
        <CardContainer position={30} className={`box-panel inter`}>
          <CardBody height={height} width={width}>
            <CardItem>
              <div
                className={
                  "box-front common-box-style text-white relative"
                }
                style={{
                  width: `${width}px`,
                  height: `${height}px`,
                }}
              >
                <img
                  src={bannerImage}
                  alt="The back of a Pokemon Card"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "10px",
                  }}
                />
              </div>
            </CardItem>
            <CardItem
              translateZ={60}
              className="text-xl font-bold text-white mt-[-150px] ml-[-50px] relative w-full h-full text-end"
            >
              <BannerCardButton/>
            </CardItem>
          </CardBody>
        </CardContainer>
      </div>
    </main>
  );
}
