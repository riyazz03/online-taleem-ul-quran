import { renderShareImage } from "@/components/seo/ShareImage";

export const alt = "Online Taleem ul Quran — Learn the Quran online with expert tutors";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return renderShareImage();
}
