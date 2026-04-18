/** Gallery image data — bento spans keep the grid visually interesting. */

export type GallerySpan = "tall" | "wide" | "normal";

export type GalleryImage = {
  src: string;
  alt: string;
  span: GallerySpan;
};

export const GALLERY: GalleryImage[] = [
  { src: "/gallery/gallery-01.jpg", alt: "YSK squash tournament action shot at Bellevue court", span: "wide" },
  { src: "/gallery/gallery-02.jpg", alt: "Junior players competing in Pacific Northwest squash tournament", span: "normal" },
  { src: "/gallery/gallery-03.jpg", alt: "Youth squash training session with Khan family coaches", span: "tall" },
  { src: "/gallery/gallery-04.jpg", alt: "US Squash sanctioned tournament match in progress", span: "normal" },
  { src: "/gallery/gallery-05.jpg", alt: "YSK community squash clinic for youth athletes", span: "normal" },
  { src: "/gallery/gallery-06.jpg", alt: "Competitive squash rally at PRO Club event", span: "wide" },
  { src: "/gallery/gallery-07.jpg", alt: "Squash player mid-swing during Yusuf Khan Invitational", span: "normal" },
  { src: "/gallery/gallery-08.jpg", alt: "YSK youth development program participants on court", span: "tall" },
  { src: "/gallery/gallery-09.jpg", alt: "Professional squash coaching session for junior athletes", span: "normal" },
  { src: "/gallery/gallery-10.jpg", alt: "Tournament award ceremony at YSK Events", span: "normal" },
  { src: "/gallery/gallery-11.jpg", alt: "Doubles squash match action at Pacific Northwest tournament", span: "wide" },
  { src: "/gallery/gallery-12.jpg", alt: "Junior player serving during US Squash circuit event", span: "normal" },
  { src: "/gallery/gallery-13.jpg", alt: "Community clinic training for first-time squash players", span: "normal" },
  { src: "/gallery/gallery-14.jpg", alt: "Junior squash athletes warming up before competition", span: "tall" },
  { src: "/gallery/gallery-15.jpg", alt: "Intense match point rally at YSK tournament", span: "normal" },
  { src: "/gallery/gallery-16.jpg", alt: "Bellevue squash tournament day event overview", span: "wide" },
  { src: "/gallery/gallery-17.jpg", alt: "Sportsmanship — players shaking hands after squash match", span: "normal" },
  { src: "/gallery/gallery-18.jpg", alt: "High-intensity court action at competitive squash event", span: "normal" },
  { src: "/gallery/gallery-19.jpg", alt: "Youth squash development and mentorship program in action", span: "tall" },
  { src: "/gallery/gallery-20.jpg", alt: "Tournament spectators and fans supporting junior squash players", span: "normal" },
];
