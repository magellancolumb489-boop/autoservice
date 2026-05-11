// TODO: Înlocuiește cu datele reale ale companiei

export const COMPANY = {
  name: "Lorem Ipsum Service SRL",
  shortName: "Lorem Ipsum Service",
  tagline: "Service auto certificat RAR · București · din 1992",
  foundedYear: 1992,
  address: {
    street: "Strada Lorem Ipsum, nr. 00",
    sector: "Sector 0",
    city: "București",
    country: "România",
    full: "Strada Lorem Ipsum, nr. 00, Sector 0, București",
  },
  phones: {
    primary: "+40 700 000 000",
    secondary: "+40 740 000 000",
    primaryHref: "tel:+40700000000",
    secondaryHref: "tel:+40740000000",
  },
  email: "office@loremipsum-service.ro",
  whatsapp: "https://wa.me/40700000000",
  schedule: {
    weekdays: "Luni–Vineri",
    hours: "09:00–17:30",
    weekend: "Sâmbătă–Duminică: închis",
  },
  maps: "https://maps.google.com/?q=Bucuresti",
  certifications: ["Certificat RAR", "ISO 9001"],
} as const
