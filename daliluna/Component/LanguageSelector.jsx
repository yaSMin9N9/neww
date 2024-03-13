import React, { useContext, useEffect, useState } from 'react';
import isoLangs from 'iso-639-1';
import LanguageContext from '../context/languageContext';
import { useRouter } from 'next/router';
import Link from "next/link";

const LanguageSelector = () => {
  const [language, setLanguage] = useState(typeof window !== 'undefined' ? localStorage.getItem("lan") : "ar");
  const router = useRouter();
  const direction = language === 'ar'|| "fa" ? 'rtl' : 'ltr';
  const handleLanguageChange = (selectedLanguage) => {
    localStorage.setItem("lan", selectedLanguage);
    setLanguage(selectedLanguage);
   
  };
  useEffect(()=>{
  if (router.pathname !== '/') {
    router.push(`/${language}`)
        }
},[language])
  

  // Sort language names alphabetically
  const sortedLanguageNames = isoLangs.getAllNames().sort((a, b) => a.localeCompare(b));

  const languageOptions = sortedLanguageNames.map((langName, index) => {
    const langCode = isoLangs.getCode(langName);
    return (
      <option key={index} value={langCode}>{langName}</option>
    );
  });

  return (
    <div dir={direction}>
      <Link href={router.asPath} locale={language}>
        <select
          style={{
            backgroundColor: "#2b294e",
            color: "#fff",
            border: "none",
            scrollbarWidth: "thin", // Set the width of the scrollbar
            scrollbarColor: "rgba(0, 0, 0, 0.5) rgba(255, 255, 255, 0.1)" // Set the color of the scrollbar
          }}
          value={language}
          onChange={(e) => {
            const selectedLanguage = e.target.value;
            handleLanguageChange(selectedLanguage);
          }}
        >
          {languageOptions}
        </select>
      </Link>
    </div>
  );
};

export default LanguageSelector;
