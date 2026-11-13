import { useState, useCallback } from "react";

export const translations = {
  en: {
    navHome: "Home",
    navBeneficiaries: "Beneficiaries",
    navTechnologies: "Technologies",
    navAdvisories: "Advisories",
    navServices: "Services",
    signIn: "Sign in",
    dashboard: "Project Dashboard",
    heroTitle: "Connecting Beneficiaries. Strengthening Resilience.",
    heroBody:
      "Connecting knowledge, technologies, natural resources, producers, markets, services and institutions to build productive, inclusive and climate-resilient food systems.",
    exploreTech: "Explore Technologies",
    viewResults: "View Project Results",
  },
  sw: {
    navHome: "Nyumbani",
    navBeneficiaries: "Wanufaika",
    navTechnologies: "Teknolojia",
    navAdvisories: "Ushauri",
    navServices: "Huduma",
    signIn: "Ingia",
    dashboard: "Dashibodi ya Mradi",
    heroTitle: "Kuunganisha na Kuimarisha Ustahimilivu.",
    heroBody:
      "Huduma Bora. Maisha Yenye Nguvu. Mifumo ya Chakula yenye Ustahimilivu",
    exploreTech: "Chunguza Teknolojia",
    viewResults: "Angalia Matokeo ya Mradi",
  },
};

export function useLanguage() {
  const [lang, setLang] = useState("en");

  const t = useCallback(
    (key) => translations[lang]?.[key] ?? translations.en[key] ?? key,
    [lang]
  );

  return { lang, setLang, t };
}
