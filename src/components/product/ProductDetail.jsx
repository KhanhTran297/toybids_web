import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, message } from "antd";
import { createBidApi } from "../../api/bid";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const ProductDetail = (props) => {
  const {
    categoryName,
    productName,
    currentPrice,
    endDate,
    startDate,
    idAuction,
    idProduct,
  } = props;

  const [auctionTime, setAuctionTime] = useState("");
  const [eventStatus, setEventStatus] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bidPrice, setBidPrice] = useState("");
  const queryClient = useQueryClient();
  const { mutateAsync: createBid } = useMutation({
    mutationKey: ["createBid"],
    mutationFn: createBidApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["detailAuction"]);
      message.success("Create bid successfully");
    },
  });
  const handleBidChange = (e) => {
    setBidPrice(e.target.value);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handlePlaceBid = () => {
    if (parseFloat(bidPrice) > parseFloat(currentPrice)) {
      setIsModalOpen(false);
      const data = {
        auctionId: idAuction,
        bidPrice: bidPrice,
      };
      createBid(data).then(() => {
        setIsModalOpen(false);
      });
    } else {
      alert(
        "Your bid must be higher than the current price and at least 10,000 higher."
      );
    }
  };

  const formatDate = (string) => {
    let time = string.split(" ");
    let date = time[0].split("/");
    let day = date[0];
    let month = date[1];
    let year = date[2];
    let timeHour = time[1].split(":");
    let hour = timeHour[0];
    let minute = timeHour[1];
    let seconds = timeHour[2];
    return new Date(year, month - 1, day, hour, minute, seconds);
  };

  useEffect(() => {
    const updateEventStatus = () => {
      const now = Date.now();
      const startDateTime = startDate ? formatDate(startDate).getTime() : null;
      const endDateTime = endDate ? formatDate(endDate).getTime() : null;

      if (startDateTime && now < startDateTime) {
        setEventStatus("1");
      } else if (
        startDateTime &&
        endDateTime &&
        now >= startDateTime &&
        now <= endDateTime
      ) {
        setEventStatus("2");
      } else if (endDateTime && now > endDateTime) {
        setEventStatus("3");
      } else {
        setEventStatus("4");
      }
    };

    updateEventStatus();
    const intervalId = setInterval(updateEventStatus, 1000);

    return () => clearInterval(intervalId);
  }, [startDate, endDate]); // Đảm bảo rằng useEffect sẽ chạy lại khi startDate hoặc endDate thay đổi

  useEffect(() => {
    const updateAuctionTime = () => {
      if (!endDate) {
        setAuctionTime("...");
        return;
      }
      const auctionEndDate = new Date(formatDate(endDate));
      const now = new Date();
      const timeLeft = auctionEndDate.getTime() - now.getTime();

      if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        if (days > 0) {
          setAuctionTime(
            `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`
          );
        } else if (days === 0 && hours > 0) {
          setAuctionTime(
            ` ${hours} hours ${minutes} minutes ${seconds} seconds`
          );
        } else if (days === 0 && hours === 0 && minutes > 0) {
          setAuctionTime(`  ${minutes} minutes ${seconds} seconds`);
        } else {
          setAuctionTime(`  ${seconds} seconds`);
        }
      } else {
        setAuctionTime("...");
        clearInterval(intervalId); // Dừng interval khi đấu giá kết thúc
      }
    };

    updateAuctionTime(); // Cập nhật lần đầu tiên
    const intervalId = setInterval(updateAuctionTime, 1000); // Cập nhật mỗi seconds

    return () => clearInterval(intervalId); // Dọn dẹp khi unmount
  }, [endDate]);
  const [timeToStart, setTimeToStart] = useState("");

  useEffect(() => {
    const updateTimeToStart = () => {
      if (!startDate) {
        setTimeToStart("...");
        return;
      }
      const startDateTime = new Date(formatDate(startDate));
      const now = new Date();
      const timeLeft = startDateTime.getTime() - now.getTime();

      if (timeLeft > 0) {
        // Tính toán days, hours, minutes, giây
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        if (days > 0) {
          setTimeToStart(
            `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`
          );
        } else if (days === 0 && hours > 0) {
          setTimeToStart(
            ` ${hours} hours ${minutes} minutes ${seconds} seconds`
          );
        } else if (days === 0 && hours === 0 && minutes > 0) {
          setTimeToStart(`  ${minutes} minutes ${seconds} seconds`);
        } else {
          setTimeToStart(`  ${seconds} seconds`);
        }
      } else {
        setTimeToStart("...");
      }
    };

    updateTimeToStart();
    const intervalId = setInterval(updateTimeToStart, 1000);

    return () => clearInterval(intervalId);
  }, [startDate]);

  // useEffect(() => {
  //   const getProductInfo = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://e-auction-api.up.railway.app/v1/auction/get/6993702382469120"
  //       );
  //       const data = response.data.data;
  //       // console.log("data", data);
  //       if (data) {
  //         setProductName(data.product.name);
  //         setProductPrice(data.currentPrice);
  //         setCategoryName(data.product.category.categoryName);

  //         const formatDate = (string) => {
  //           let time = string.split(" ");
  //           let date = time[0].split("/");
  //           let day = date[0];
  //           let month = date[1];
  //           let year = date[2];
  //           let timeHour = time[1].split(":");
  //           let hour = timeHour[0];
  //           let minute = timeHour[1];
  //           let seconds = timeHour[2];
  //           const result = new Date(year, month - 1, day, hour, minute, seconds);
  //           return result;
  //         };

  //         const auctionEndDate = new Date(formatDate(data.endDate));
  //         const now = new Date();
  //         const timeLeft = auctionEndDate.getTime() - now.getTime();

  //         if (timeLeft > 0) {
  //           const secondsLeft = Math.floor(timeLeft / 1000);
  //           const minutes = Math.floor(secondsLeft / 60);
  //           const seconds = secondsLeft % 60;
  //           setAuctionTime(`${minutes} minutes ${seconds} seconds`);
  //         } else {
  //           setAuctionTime("Đã kết thúc");
  //         }

  //         // Tính thời gian giao hàng
  //         const deliveryStartDate = formatDate(data.delivery.startDate);
  //         const deliveryEndDate = formatDate(data.delivery.endDate);

  //         const deliveryStartOptions = {
  //           weekday: "short",
  //           month: "short",
  //           day: "numeric",
  //         };
  //         const deliveryEndOptions = {
  //           weekday: "short",
  //           month: "short",
  //           day: "numeric",
  //         };

  //         const startDeliveryString = deliveryStartDate.toLocaleDateString(
  //           "en-US",
  //           deliveryStartOptions
  //         );
  //         const endDeliveryString = deliveryEndDate.toLocaleDateString(
  //           "en-US",
  //           deliveryEndOptions
  //         );

  //         setDeliveryTime({
  //           start: startDeliveryString,
  //           end: endDeliveryString,
  //         });
  //       }
  //     } catch (error) {
  //       console.error("Lỗi khi lấy thông tin sản phẩm:", error);
  //     }
  //   };

  //   getProductInfo();

  //   const interval = setInterval(getProductInfo, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  // const handlePlaceBid = async () => {
  //   try {
  //     // Thực hiện yêu cầu đấu giá tại đây
  //     const response = await axios.post("URL_DAU_GIA", {
  //       // Truyền thông tin đấu giá vào đây (nếu có)
  //     });

  //     console.log("Yêu cầu đấu giá thành công:", response.data);
  //     // Gọi lại hàm lấy thông tin sản phẩm để cập nhật dữ liệu mới nhất sau khi đấu giá thành công
  //     getProductInfo();
  //   } catch (error) {
  //     console.error("Lỗi khi đấu giá:", error);
  //   }
  // };
  return (
    <div className="w-[600px] h-[600px] flex items-center rounded-[30px] overflow-hidden border border-solid border-black flex-col">
      <div className="relative flex flex-col items-center self-center justify-between w-full h-full p-6">
        <div className="w-full h-auto  font-bold text-black text-4xl text-center tracking-[0] leading-[normal] flex items-center justify-center">
          {productName}
        </div>
        <div className="flex flex-row w-full h-auto gap-2 ">
          <div className="text-4xl font-bold">Current: {currentPrice}.vnd</div>
        </div>

        <div className="flex flex-row items-center w-full h-auto gap-2">
          {eventStatus === "1" && (
            <div className="w-full text-lg font-bold align-middle">
              Time: {timeToStart} start
            </div>
          )}
          {eventStatus === "2" && (
            <div className="w-full text-lg font-bold align-middle">
              Time:{auctionTime} left
            </div>
          )}
          {(eventStatus === "3" || eventStatus === "4") && []}
          {/* <div className="text-2xl font-bold text-[#f65151]">50m 21s</div>
          <div className="w-[2px] h-[40px] bg-black "></div>
          <div className="text-2xl font-normal">Today 11:00 PM</div> */}
        </div>
        <div className="flex flex-row items-center w-full h-auto gap-2">
          <div className="w-full text-lg font-bold">
            Category: {categoryName}
          </div>
        </div>

        <div className="flex flex-row items-center w-full h-auto gap-2">
          <div className="text-lg  font-bold w-[120px]">Payments:</div>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABBVBMVEX////sHCQAWqnrAAAAWKgAod0AUqYAVqcAj9XrAA4ATqQAVqb1oaLsFR70lZf84eLsDBgPX6tFd7bCzuMAS6MAk9dbhb3xdngARqEAU6buR0sAmNbtOkBtkcLq9fvj6fIAcLjC4PMAgMQAj8+yxN3O5vXziowAnNqDRX30l5n5ycrL1+iRyer2rrAAd733CwD73t97mcan0+4AiNP3t7nwZWgAhcjyf4L6z9Dxb3LtKC/l8/o2pt2VzOu32/H61NWasdP+9PR2vubvUVV1fazvTVEzbbHwaGuIpMxOr+D4v8A+gb9/ToUAZ7K2vdSWQXPZtcEgP5PFMFCjGlWLcpxOWJtnt+NrBDvTAAANGElEQVR4nO2de1viShLGA0kMASPBAQWjGUEhoyLH8YKjIA46F5mz7OXsnvn+H2W7+pYKNxFRAk+/fwykO8T+UdVV3aE7o2lKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpK0+jkZNEteFs9FfP54udFt+INtZlOEqU3F92ON9PmWpJqbVURBeDKIoaAK4qIAVcSMQq4goiDgCuHOAz4PGL3+P59GjcPjQJ8DvFGJzp9rxa+UqMBJyPu2gkifeP9WvkKjQOchPjoJhJLgzgAaDBNRryyE1x67X1bO4OigIaV229UKpVG37CMsYjbOudz9dpl971b/EJFAK1cxTOFDhqGNRqxJgDtR027P443IgbM5A4ImNesNBqNykFA3leItw4jriPALzaJqEeLaPmUQoCGVTHNoJKzMrQfZjL9Jjnet4YQTyXglfZLd+IdbrAFDWLASsaIdEkoGkS8jADGPKJG+mBgerkMgGUsKmC19k2zmYkgYkD5Pq6IEQt65oFF3+wfkGATeM0+MBq5wDRwuAkBfyLAmCJiQOuAAyYtEmACiDKmR/ogQezjvCih9JsIYCwRIxZsmAFP8sb+fpL4aK5BLNkkZoykfgx4GgGMIWI00ZtmH3ySjWkYaWk/MA/EAUsaIeD2EGDsECOARoWYi7zmxDEdtRlJ0jdpcDUaFRJu/sSA60OAMUP8msYWzARmjvbFHA2g/UZjP5nh4QcQLc9slpKf/hAk1yMB44VYMrAJ9yHMkH89sFyfjduatIoj9gOz+TxgnBD9Ijah1TT3DTAU+Zdwml6l0QzMQCDSiGp+mwIwTogRwoxnkk6XMz3CkjPNRomM2cgIJ0B50vjHVIAxQvxhYS81AwsSRsVIZpowTIMyK4IYumhNO5oAGB/EE2zEHDAwV82YMISBWRMEHo87amF6wPggHiLEPgknycyB2Yf+BjGnEUB2zHBEI/iGADeeAYwl4jAhGwBwRCO04EY4+Z2EeLxoOKYQEXmpRb2UvKeI1FER4NFUgAnn+6LZuCTicKRBiAEGvJ4GkJy5aDQhgQjZAnyVZ4v9DEIshH1wfVrA+BAKxIzI+H2W8QGx1DQDGMN9mgHQ/blosFAMMRy1gYM2MCIG3J4SMKFnF82FxBFNGNSw8TVGNMORzOkLAL8smioiikh6XZP1wYqwogGI3xDgzZICMkQDZsAwrQgRwbShi16+ADAmyRCJIjZML4MRK0YU8Kc9ESvWgAyR34kSiMbMgL8WTTNSBNFIBhFEPJL5hX5pWk5ATfsnsWIuRGwQh/3XSgFq2r//YxgIsZL5S0CRyPg4NeDlojkmaP2/9PY2zYf75v9cVzT6fkUACeIff336OzBTxt+f/tLDH3jvtZ0VAYQfBV37D93WbdsJG32m7boToCKA8V+WMXR/yVkxwCFEhwygpwdcX3Trp1IEcRUBI4gAeLtygAhRv+2uJCAg2q7rwuqKbGJqwDgvxRhWdn37pkYGX0e68zwbA4zJ7dEX6WzDnjbPLyPghq7rU/Mtw7K2YU36aWklAF+CuKSA0yPq14tu6cyaDnGJAadDXGrAaRD17UW38ZV6DnHpAZ9D1G8W3b45aOKSi1UAnIRox+j3s1dpHKJ9teiWzU2jEVcIcDSivkqAGl+Mj+QseaIfVnYHMzq2G9/fJmbWrx3ddh0n4bi27izTLZkXKHt6s5Nwdq+OlmhLpZKSkpKSkpKSktKidezGcf3g1DpO7DKhifjRLRTcMq7so+7u8op7nQvPGbZpyWlW1KGvo8uLfmkf8rDwVii59VWc8jnNy/LseJMfp+UZmm+UaFFxxifDbdsOlYvKrqGMLaC/1l20+IU/v8PF0/Yu3LjQu9oR/xFRR49MoLvT6W+igGgIJa302gd+SpoXpw/Zcc5ipxR9eZXDNJSszfpYuK7YIo+Wk2dJmQv3qE/ht09Hlzci5H56fIVrN+E8ktdbNrd3dlHdFa/TNAPvYCS0RU60yfeMWXxv9Ee+5cHakhf5SB0gNyMgbQS9IYYWKQEh8bYvt3rCsfVHtABN2An3zJqbsOGUY45vo7u/63bCZtP8HCNcy6c5avEjLf8hyPmx9sS3q+aFlbXDNVQ9g3jD8NacSxvM9Kg7rn67HnlOR427Kf4RwnGYZ2bl0pPwyxokTH/QTnIWMlq4d3PtK/+M2AloiYvAJ1G/fLmG+w8xKzBs67WzgXPPht30i55waZiShLCCbzyhpq0xs9Ge9hXtoOafoU4JyE/seK8U+vBsuuZuGt400sevMN9lnQ2t7iUfZwspQ0LHmUjIqej7H5bc754XsfIwj/0Wtj4a6TDuzKB77qY7ogB2mdvoBOynp8zibphcdGHRkDDhPk4i5EZaO2RxJf2B9bzSnrjkFvfjH3AA74uyT84mHgRlNAUnhei5UQNd7+CfVWToFdgkvPJ9S4hQrpoZSaixYAOEYE5LEOXlX+F+DBkEfHRtT3udeCaTbqrzjSxZuqTLtSO/bf7kPi0CLPk6uMsC4a1c7308gTB83zeSpSeNG1GkRJI9Wfwx0vSdkdReKf7li0QGSY/l/xt3KHDK0Mv9sCudFC7jPIZr+brjCVnHI90M/DX/URgVhZO9NZ4U4ckUsw5mkHYibvrTFYOWDXuYUHMxAfRLUQ+EOyK98u9rNGFR8BAnNSCTfy5FUiIRf4IIPBEm/fRqQBE+bLZoUKcr0kFHowhrNh4hfHdk2GWEWoL/bEGdeyQhc0rAIYU0DYrY81X+lXDzOIs3rxQPH84tHICT8mg/kjCLQ28XhV1OGEn8IwlpSodRG4Axu7FaA43MnkSiLL4qUQhx16KZmnQ+tzaBMOLThEAOwzkhemZLdiThU9qw0hb0raeSsBBPkXnU4/jQZu1Qm4f4iNoGstBJxxCeotBLEo3cPygIyXRFJv4RhHtFo7/Fmg2bFj+fgD4wwhKaP/C+mZ99PBoR97wEjZXwMoGwG4beMxl2MaEY+JBxwenISMN1Ar2vlAZxlzTClDhvQj5yI8bbdpkpxxPyJAJOSKKOK5cbhoRiWJBwbxMTCDkDVpgS503IR26kuToaOI8h/MJ9eoNOK+R8PySUEyk0kBhBCA+9SQvhCcdbEMoY/wU56ThCAKOh9wyfjAnx0zDGEoKT5k+E9qyByDlvQj5yc0gXsjeihcOEG/zkHXxyhFA+r3QCIUFAE/mTwZQ4b0KRxRw8uxtHOPLkKCG38yRCMlTDqWAwJc6bUHsULWJ5n2ocYWghdPIAoZgrjyWEkQ3O5oMpce6E97JF4YaPsYRnI04eIJQPaBtHSDpeZObOR24yJT7Nm1A+AwHddGN3ZdwR6wo3hk8eJBQXFITJAcJ8ZBzKCpJ0xsQ0f0Ltii71wX7HBnOR24NCNXYyroL4o+MbOz91RDhgIXoDbRShnOpzL03PkVD7dau72O/OdJtq5HMdjhOEEd3bIWfDfWUb3/JY121xzlOe3rcuibnex2LJsiIPOj3M87vfRTpbOimyo5KlzVP3NRc76QbX6F0Sl9917KRXO9+JdiKdtltzdLpTzd/a4+L5gR+EI21/c0toEyKsPNqa93+B8pJfYbpTrFnLXsbtyR5KSkpK8VK9vugWzFcPrYEC//zhbtIHeuNq2+f+Q7Qk6Mzerlcp4EYqp3ztoT1cbw5CR+Q9jCqtVqvmQ8uMmr9wPmMLX6sHk78GpBHDNPXyDNf0PC/wCuVCpHBhhJ0Um8AFUWu0BmD9gQJyWC34si5ySxeOzLvBTxJCvzWXW78vlJ/qiJfqhWhAPZVKXZS1iyocgO8+XJCSnmwf1BcKxAvBE89J3UVb1nUKpPKuTSrIFTS/DaeC+Qp1eNt7TzYukxoPTFnl5tTqhY7vV1tairroA2mVT2papmjeXYFUVD1O6LcAhDs7uchDy2/1CsSG8PGgXfX9eop8VV7h3PfLhZEd923FOiL8Kwk97mIhIdW56Fht2sy7AiOkKqcil9M4YStF3QDCWaGOqt9VZcoF3VASpsr4lRGSPnQnCBnXuSQkdR1B+Pu3PIUS0k4IXwmLNHfeW/MMi3ZEH2AmEN4VSL/zROt+U0P02rwfQl1B0PeeIQzeBSoq6Ig0og4TskjTI3aGcNSR4b9d6PU8yC0EpJWCpleFDeNICJmQdg9JKFIXI/3d4+2S/bBj1u/uaAgmIIw77IdteYnYEFZJKyAuhoS/PTCer7UhB1RJ0OjQhvbEkKfd8/mZhLBKv4ffgp6Zuw6Xig0h8bkCTd5hPmyTnnVBHDAgrzSF9VKmWShUeXUZUl4KBpoQJB9SJrmCHPvUUwUvVQBMkg+rF5QQOsIFJaxHBzrvpXKZoYXDlla5Q3GqnQ4rbHU6VVkLJvH9hxQbvkTrSE25U5aXY5+m6VQb+BtxFotA3ANXUmxgUk89d97yqgwZkPW1lVWrWl1dF1VSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUnp7/R/Y21To9759iAAAAABJRU5ErkJggg=="
            alt=""
            className="border-[1px] border-black w-16 h-10 px-1"
          />
        </div>
        {eventStatus === "2" && (
          <div className="flex flex-row justify-center ">
            <div className="flex w-[216px] h-[52px] items-start gap-[10px] px-[45px] py-[17px] relative bg-[#52ab98] rounded-[16px]">
              <div
                className="relative flex-1 self-stretch mt-[-1.00px] [font-family:'Roboto-Bold',Helvetica] font-bold text-white text-[14px] text-center tracking-[0] leading-[normal]"
                onClick={showModal}
              >
                Place Bid
              </div>

              <Modal
                title="Place your bid"
                open={isModalOpen}
                onOk={handlePlaceBid}
                onCancel={handleCancel}
                okText="Place Bid"
                cancelText="Cancel"
                okType="danger"
              >
                <p>Enter your bid price:</p>
                <input
                  type="number"
                  value={bidPrice}
                  onChange={handleBidChange}
                  className="border-[#00000] border-2"
                />
                <p>Please bid more than current bid 10000</p>
              </Modal>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
