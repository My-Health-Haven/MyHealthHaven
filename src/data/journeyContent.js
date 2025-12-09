import React from "react";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";

export const resolveJourneyContent = (journey) => {
  if (!journey || !journey.category || !CONTENT_DB[journey.category]) {
    return CONTENT_DB.default;
  }

  const baseContent = CONTENT_DB[journey.category].default;
  const overrides = getOverrides(journey);

  return { ...baseContent, ...overrides };
};

const getOverrides = (journey) => {
  const { category, age, gender } = journey;
  const isYoung = ["18-29", "30-45"].includes(age);
  const isMature = ["46-60", "60+"].includes(age);

  const db = CONTENT_DB[category];
  if (!db) return {};

  // Plastic Surgery Logic
  if (category === "plastic") {
    if (gender === "male") return db.male || {};
    if (isYoung) return db.young_female || {};
    if (isMature) return db.mature_female || {};
  }

  // Dental Logic
  if (category === "dental") {
    if (isYoung) return db.young || {};
    if (isMature) return db.mature || {};
  }

  // Ortho Logic
  if (category === "ortho") {
    if (isYoung) return db.young || {};
    if (isMature) return db.mature || {};
  }

  // General Logic
  if (category === "general") {
    if (isYoung) return db.young || {};
    if (isMature) return db.mature || {};
  }

  return {};
};

const CONTENT_DB = {
  default: {
    hero: {
      title:
        "World-class medical care in Mexico, guided by U.S. healthcare experts.",
      subtitle:
        "We help Americans access safe, accredited doctors, hospitals and clinics in Mexico with transparent pricing, bilingual support, and a dedicated Health Navigator™ from your first question to full recovery.",
      chip: "Made In America, Made Better in Mexico",
    },
    problem: {
      title:
        "When U.S. healthcare is out of reach, patients are forced into hard choices.",
      desc: "Unfortunately many people end up postponing necessary procedures because of high costs, long wait times, or baffling insurance rules.",
    },
    solution: {
      title:
        "MyHealth Haven turns medical travel into a guided, transparent experience.",
      desc: "We bridge the U.S. and Mexican healthcare systems, combining American standards with Mexico’s clinical excellence and affordability.",
    },
  },
  ortho: {
    default: {
      hero: {
        title: "Regain your mobility with premium Orthopedic care in Mexico.",
        subtitle:
          "Access world-class joint replacement and orthopedic surgery at a fraction of U.S. costs. We guide you to board-certified surgeons and top-tier hospitals.",
        chip: "Top-Tier Orthopedics",
      },
      problem: {
        title: "Living with chronic pain shouldn't be your only option.",
        desc: "Don't let high deductibles or long wait times keep you from the mobility you deserve. Orthopedic care abroad is a proven, safe alternative.",
      },
      solution: {
        title: "A pain-free future, fully guided by experts.",
        desc: "From pre-op MRI reviews to post-op physical therapy coordination, your Health Navigator ensures your joint replacement journey is seamless.",
      },
    },
    young: {
      // Sports Medicine Focus
      hero: {
        title: "Get back in the game with elite Sports Medicine.",
        subtitle:
          "ACL repair, meniscus surgery, and ligament reconstruction by surgeons who treat pro athletes. Don't let an injury sideline you for life.",
        chip: "Sports Medicine & Arthroscopy",
      },
      problem: {
        title: "Your active lifestyle shouldn't end with an injury.",
        desc: "U.S. surgery costs can be a game-ender for the uninsured or underinsured. You need precision repair without the financial knockout.",
      },
      solution: {
        title: "Elite surgical care to get you moving again.",
        desc: "We connect you with Mexico's top sports orthopedic specialists. Includes MRI review, surgery, and a rehab plan to get you back to peak performance.",
      },
    },
    mature: {
      // Joint Replacement Focus
      hero: {
        title: "Rediscover a pain-free life with Joint Replacement.",
        subtitle:
          "Premium Knee and Hip replacement without the wait. Enjoy 5-star care and a recovery that feels like a vacation.",
        chip: "Knee & Hip Specialists",
      },
      problem: {
        title: "Don't spend your retirement waiting for surgery.",
        desc: "Chronic arthritis steals your independence. Waiting months for approval or paying out-of-pocket in the U.S. shouldn't be the barrier to walking comfortably again.",
      },
      solution: {
        title: "Complete care: From Concierge pickup to Recovery.",
        desc: "Our packages include everything: Hospital, Surgeon, and a recovery stay where you're cared for 24/7 until you're ready to fly home safely.",
      },
    },
  },
  plastic: {
    default: {
      hero: {
        title: "Achieve your aesthetic goals with confidence in Mexico.",
        subtitle:
          "Expert plastic surgery with board-certified surgeons. We prioritize safety, natural results, and a recovery experience that feels like a retreat.",
        chip: "Safe, Certified Plastic Surgery",
      },
      problem: {
        title: "Beauty shouldn't come with a compromise on safety.",
        desc: "Finding the right surgeon abroad can be daunting. We eliminate the guesswork by partnering only with credentialed, proven aesthetic specialists.",
      },
      solution: {
        title: "Your transformation, safely navigated.",
        desc: "We handle the vetting and logistics so you can focus on your recovery. Enjoy luxury recovery boutiques and comprehensive follow-up.",
      },
    },
    young_female: {
      // Body Contouring / Shape
      hero: {
        title: "Sculpt the silhouette you've always wanted.",
        subtitle:
          "BBL, Lipo 360, and Tummy Tucks by Mexico's top body contouring specialists. Safe, stunning results at a price that makes it possible.",
        chip: "Body Contouring Experts",
      },
      problem: {
        title: "Confidence starts with feeling great in your skin.",
        desc: "You know what you want, but safety concerns and high U.S. prices stand in the way. Don't settle for 'budget' clinics that cut corners.",
      },
      solution: {
        title: "The safest path to your dream curves.",
        desc: "We partner with board-certified plastic surgeons who specialize in high-definition body contouring. Your safety is our obsession, your results are our pride.",
      },
    },
    mature_female: {
      // Rejuvenation
      hero: {
        title: "Turn back time with natural, elegant rejuvenation.",
        subtitle:
          "Deep Plane Facelifts, Neck Lifts, and Eyelid surgery performed by masters of facial aesthetics. Look refreshed, not 'done'.",
        chip: "Facial Rejuvenation Specialists",
      },
      problem: {
        title: "Aging gracefully doesn't mean you can't have a little help.",
        desc: "Facial procedures require an artist's touch. Finding a surgeon you trust with your face is the hardest part of the journey.",
      },
      solution: {
        title: "Master surgeons for natural, youthful results.",
        desc: "We connect you with surgeons renowned for their subtle, restorative techniques. Recover in privacy and comfort before revealing the new you.",
      },
    },
    male: {
      // Masculine Aesthetic
      hero: {
        title: "Sharpen your edge with Male Plastic Surgery.",
        subtitle:
          "Gynecomastia surgery, Liposuction, and Rhinoplasty tailored for the masculine physique. Discreet, professional, and effective.",
        chip: "Men's Aesthetic Surgery",
      },
      problem: {
        title: "Look as fit and energetic as you feel.",
        desc: "Diet and exercise sometimes aren't enough. Stubborn areas or structural features can hold back your confidence, personally and professionally.",
      },
      solution: {
        title: "Precision procedures for the modern man.",
        desc: "Our surgeons understand male anatomy. We offer efficient, discreet pathways to getting the look you want with minimal downtime.",
      },
    },
  },
  dental: {
    default: {
      hero: {
        title: "World-class Dental Care worth smiling about.",
        subtitle:
          "Save up to 70% on implants, veneers, and full restorations. Our vetted dental clinics offer U.S.-standard materials and technology.",
        chip: "Implants, Veneers & Restoration",
      },
      problem: {
        title: "Dental work shouldn't break the bank.",
        desc: "Delaying dental care often leads to bigger health issues. Mexico offers the same top-tier implants and materials as the U.S. for a fraction of the price.",
      },
      solution: {
        title: "A perfect smile, a perfect journey.",
        desc: "We coordinate your entire dental trip, from airport pickup to the final fitting. Walk away with a smile you can be proud of.",
      },
    },
    young: {
      // Aesthetics / Veneers
      hero: {
        title: "Design your perfect Hollywood Smile today.",
        subtitle:
          "Premium Veneers and Smile Makeovers in Cancun and Tijuana. Get the smile you see on social media for a price you can actually afford.",
        chip: "Cosmetic Dentistry & Veneers",
      },
      problem: {
        title: "Your smile is your first impression.",
        desc: "Chipped, stained, or crooked teeth can hold back your confidence. U.S. cosmetic dentistry prices are often astronomical.",
      },
      solution: {
        title: "A VIP Smile Makeover experience.",
        desc: "We create a custom itinerary for your transformation. Digital smile design, premium materials, and a quick turnaround so you can enjoy your trip.",
      },
    },
    mature: {
      // Restoration / Implants
      hero: {
        title: "Restore your bite and confidence with Dental Implants.",
        subtitle:
          "All-on-4, Full Mouth Reconstruction, and Zirconia Crowns. Eat what you want and smile without hesitation again.",
        chip: "Full Mouth Restoration",
      },
      problem: {
        title: "Dental health affects your whole life.",
        desc: "Missing teeth or uncomfortable dentures affect your diet, speech, and joy. You deserve a permanent solution that looks and feels natural.",
      },
      solution: {
        title: "State-of-the-art Implantology.",
        desc: "Our partners use 3D guided surgery and top implant brands (like Nobel, Straumann). We coordinate every step of your restoration journey.",
      },
    },
  },
  bariatric: {
    default: {
      hero: {
        title: "Take control of your health with expert Weight Loss surgery.",
        subtitle:
          "Comprehensive bariatric programs including Gastric Sleeve and Bypass. We support you before, during, and long after your procedure.",
        chip: "All-Inclusive Weight Loss Packages",
      },
      problem: {
        title: "Weight loss is a journey you shouldn't walk alone.",
        desc: "Navigating diet, exercise, and medical options is overwhelming. Our bariatric partners offer a multidisciplinary approach for lasting results.",
      },
      solution: {
        title: "A lighter future, supported every step of the way.",
        desc: "Your Health Navigator walks with you through nutrition planning, surgery, and long-term follow-up to ensure your success.",
      },
    },
  },
  general: {
    default: {
      hero: {
        title: "Proactive healthcare for a longer, better life.",
        subtitle:
          "From Executive Checkups to specialized surgeries. Access rigorous medical care without the wait or the opaque pricing.",
        chip: "General Medicine & Checkups",
      },
      problem: {
        title: "Don't wait for a crisis to check your health.",
        desc: "The U.S. system is great at sick-care, but expensive for wellness. Comprehensive screening often isn't covered or costs thousands.",
      },
      solution: {
        title: "Comprehensive care, transparently priced.",
        desc: "We connect you with top internists and specialists for full-body makeovers, cardiac screening, and preventative surgery.",
      },
    },
    young: {
      hero: {
        title: "Optimize your health with a Total Wellness Checkup.",
        subtitle:
          "Full-body MRI, extensive blood panels, and cardiac screening. Know your numbers and take charge of your future.",
        chip: "Preventative & Wellness",
      },
      problem: {
        title: "Knowledge is power when it comes to your body.",
        desc: "Standard annual physicals often miss the big picture. Get a deep-dive analysis of your health markers while enjoying a trip to Mexico.",
      },
      solution: {
        title: "Bio-hacking your health, the medical way.",
        desc: "A full day of testing in a world-class facility, followed by a detailed review with a specialist. Actionable data for your longevity.",
      },
    },
    mature: {
      hero: {
        title: "Executive Health Checks for peace of mind.",
        subtitle:
          "Deep cardiac screening, cancer markers, and full-system analysis. Detect issues early with affordable, VIP diagnostics.",
        chip: "Executive Heath & Cardiac",
      },
      problem: {
        title: "Your health is your most valuable asset.",
        desc: "As we age, risks increase. Waiting for symptoms is often too late. Early detection is the key to enjoying your golden years.",
      },
      solution: {
        title: "A 360-degree view of your health.",
        desc: "We facilitate a comprehensive medical tour: Labs, Imaging, and Specialist consults, all coordinated in one efficiency trip.",
      },
    },
  },
};
