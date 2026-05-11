export const SITE_CONFIG = {
  name: "톡바른경희한의원 본점",
  shortName: "톡바른경희한의원",
  description:
    "경기광주 톡바른경희한의원 본점은 한약, 추나·통증치료, 교통사고 자동차보험 진료, 피부미용을 환자 상태에 맞춰 설명하고 치료 방향을 정합니다.",
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://talkbr.com"
  ).replace(/\/$/, ""),
  ownerName: "이기홍",
  businessNumber: "465-09-08212",
  email: "talktalkhani@naver.com",
  phone: "031-767-0075",
  address: {
    streetAddress: "파발로 187 세양빌딩 2층",
    addressLocality: "광주시",
    addressRegion: "경기도",
    addressCountry: "KR",
  },
  blogUrl: "https://blog.naver.com/talktalkhani",
  bookingUrl: "https://booking.naver.com/booking/13/bizes/1171309",
};
