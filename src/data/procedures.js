/**
 * Static procedures catalog.
 *
 * Edit this file directly to add, remove, or update procedures.
 * Order within each section_group follows the file order below — keep
 * entries alphabetized within each speciality.
 */

export const PROCEDURES = [
  // Bariatric
  {
    procedure_id: 'bar-duodenal-switch',
    section_group: 'Bariatric',
    procedure_name: 'Duodenal switch',
    description:
      'A weight-loss surgery that makes the stomach smaller and changes how food moves through the intestines to reduce calorie absorption. Usually considered major bariatric surgery; every case is unique.',
    visible: true,
  },
  {
    procedure_id: 'bar-gastric-bypass',
    section_group: 'Bariatric',
    procedure_name: 'Gastric bypass',
    description:
      'A weight-loss surgery that creates a small stomach pouch and reroutes part of the small intestine. Usually considered major bariatric surgery; every case is unique.',
    visible: true,
  },
  {
    procedure_id: 'bar-gastric-sleeve',
    section_group: 'Bariatric',
    procedure_name: 'Gastric sleeve',
    description:
      'Sleeve gastrectomy, commonly called gastric sleeve, removes part of the stomach to make it smaller and limit food intake. Usually considered major bariatric surgery; every case is unique.',
    visible: true,
  },
  {
    procedure_id: 'bar-lapband',
    section_group: 'Bariatric',
    procedure_name: 'Lapband',
    description:
      'Laparoscopic gastric banding, commonly called lap band, places an adjustable band around the upper stomach to limit food intake. Less commonly performed today than sleeve or bypass; still surgery, and every case is unique.',
    visible: true,
  },
  {
    procedure_id: 'bar-weight-loss-surgery',
    section_group: 'Bariatric',
    procedure_name: 'Weight loss surgery',
    description:
      'Umbrella term for bariatric procedures that help patients lose weight through changes to the stomach, intestines, or both. Options range from adjustable bands to gastric sleeve, bypass, and duodenal switch. Usually major surgery; every case is unique.',
    visible: true,
  },

  // Cardiology
  {
    procedure_id: 'car-ablation',
    section_group: 'Cardiology',
    procedure_name: 'Ablation',
    description:
      'A minimally invasive procedure that uses heat or cold energy delivered through a catheter to scar small areas of heart tissue and correct abnormal heart rhythms. Not open surgery; complexity depends on the arrhythmia.',
    visible: true,
  },
  {
    procedure_id: 'car-bypass',
    section_group: 'Cardiology',
    procedure_name: 'Bypass',
    description:
      'Coronary artery bypass graft surgery, commonly called heart bypass, uses a blood vessel from another part of the body to route blood around blocked heart arteries. Usually considered major surgery; every case is unique.',
    visible: true,
  },
  {
    procedure_id: 'car-defibrillator-placement',
    section_group: 'Cardiology',
    procedure_name: 'Defibrillator placement',
    description:
      'Surgical placement of an implantable cardioverter defibrillator (ICD) under the skin near the collarbone, with wires that reach the heart to detect and correct dangerous rhythms. Usually moderate surgery; every case is unique.',
    visible: true,
  },
  {
    procedure_id: 'car-echocardiogram',
    section_group: 'Cardiology',
    procedure_name: 'Echocardiogram',
    description:
      'An ultrasound of the heart that shows heart movement, valves, and blood flow. Non-surgical diagnostic test; complexity varies by type.',
    visible: true,
  },
  {
    procedure_id: 'car-imaging',
    section_group: 'Cardiology',
    procedure_name: 'Imaging',
    description:
      "Cardiac imaging includes echocardiograms, CT angiography, cardiac MRI, and nuclear scans used to evaluate the heart's structure, blood flow, and function. Non-surgical diagnostic testing; type depends on what the cardiologist needs to see.",
    visible: true,
  },
  {
    procedure_id: 'car-pacemaker',
    section_group: 'Cardiology',
    procedure_name: 'Pacemaker',
    description:
      'Surgical placement of a small device under the skin near the collarbone with wires that reach the heart to maintain a steady heartbeat. Usually moderate surgery; every case is unique.',
    visible: true,
  },
  {
    procedure_id: 'car-stent-balloon',
    section_group: 'Cardiology',
    procedure_name: 'Stent/balloon',
    description:
      'Angioplasty uses a balloon-tipped catheter to open narrowed heart arteries; a small mesh stent is often left in place to keep the artery open. Less invasive than bypass surgery; complexity depends on the blockage.',
    visible: true,
  },
  {
    procedure_id: 'car-stress-test',
    section_group: 'Cardiology',
    procedure_name: 'Stress test',
    description:
      'A heart test that checks how the heart works during exercise or medication-assisted stress. Non-surgical diagnostic test; complexity depends on the method used.',
    visible: true,
  },
  {
    procedure_id: 'car-valve-repair',
    section_group: 'Cardiology',
    procedure_name: 'Valve repair/replacement',
    description:
      'Surgery to repair a damaged heart valve or replace it with an artificial or tissue valve so blood can flow properly through the heart. Usually considered major surgery; every case is unique.',
    visible: true,
  },

  // Cosmetic
  {
    procedure_id: 'cos-breast',
    section_group: 'Cosmetic',
    procedure_name: 'Breast (Augmentation, Lift, Reconstruction, Reduction)',
    description:
      'Breast procedures including augmentation (implants or fat transfer to increase size), lift (raises and reshapes sagging breasts), reconstruction (rebuilds the breast after mastectomy or major surgery), and reduction (removes excess tissue to reduce size). Complexity varies by procedure; every case is unique.',
    visible: true,
  },
  {
    procedure_id: 'cos-cheek-implants',
    section_group: 'Cosmetic',
    procedure_name: 'Cheek implants (Otoplasty)',
    description:
      'Surgery that places implants in the cheeks to add volume or improve facial contour. Less common cosmetic procedure; usually moderate surgery; every case is unique.',
    visible: true,
  },
  {
    procedure_id: 'cos-ear-pinning',
    section_group: 'Cosmetic',
    procedure_name: 'Ear pinning',
    description:
      'Otoplasty, commonly called ear pinning, reshapes or repositions prominent ears. Common cosmetic procedure; usually minor to moderate surgery.',
    visible: true,
  },
  {
    procedure_id: 'cos-eyelid-surgery',
    section_group: 'Cosmetic',
    procedure_name: 'Eyelid surgery (Blepharoplasty)',
    description:
      'Blepharoplasty removes or repositions excess eyelid skin, fat, or muscle. Common cosmetic or functional surgery; often minor to moderate.',
    visible: true,
  },
  {
    procedure_id: 'cos-facelift',
    section_group: 'Cosmetic',
    procedure_name: 'Facelift',
    description:
      'Rhytidectomy, commonly called a facelift, tightens facial tissues and removes excess skin to reduce visible aging in the lower face. Common cosmetic surgery; usually moderate surgery.',
    visible: true,
  },
  {
    procedure_id: 'cos-liposuction',
    section_group: 'Cosmetic',
    procedure_name: 'Liposuction',
    description:
      'A procedure that removes fat from one or more targeted areas using suction. Common cosmetic procedure; usually minor to moderate surgery depending on volume and anesthesia.',
    visible: true,
  },
  {
    procedure_id: 'cos-rhinoplasty',
    section_group: 'Cosmetic',
    procedure_name: 'Rhinoplasty',
    description:
      'Rhinoplasty, commonly called a nose job, reshapes the nose for appearance, breathing, or both. Common surgery; complexity varies significantly.',
    visible: true,
  },
  {
    procedure_id: 'cos-scar-revision',
    section_group: 'Cosmetic',
    procedure_name: 'Scar revision',
    description:
      'Surgery to improve the appearance or function of a scar. Minor revisions are usually quick outpatient procedures, while larger or deeper scars may require more complex surgery. Complexity depends on scar size, depth, and location.',
    visible: true,
  },
  {
    procedure_id: 'cos-tummy-tuck',
    section_group: 'Cosmetic',
    procedure_name: 'Tummy tuck',
    description:
      'Abdominoplasty, commonly called a tummy tuck, removes excess abdominal skin and may tighten abdominal muscles. Common cosmetic surgery; usually moderate to major surgery.',
    visible: true,
  },

  // Dental & Orthodontics
  {
    procedure_id: 'den-aligners',
    section_group: 'Dental & Orthodontics',
    procedure_name: 'Aligners',
    description:
      'Clear, removable plastic trays that gradually move teeth into a straighter position over time, used as an alternative to braces. Non-surgical orthodontic treatment; length depends on tooth movement needed.',
    visible: true,
  },
  {
    procedure_id: 'den-crowns',
    section_group: 'Dental & Orthodontics',
    procedure_name: 'Crowns',
    description:
      'A dental crown, commonly called a cap, covers and protects a damaged or weakened tooth. Common restorative procedure; complexity depends on tooth condition.',
    visible: true,
  },
  {
    procedure_id: 'den-cleaning-exam',
    section_group: 'Dental & Orthodontics',
    procedure_name: 'Dental cleaning/exam',
    description:
      'Routine dental visits combine a professional cleaning (removes plaque, tartar, and stains) with an exam of teeth, gums, bite, and overall mouth health. Standard preventive care; not surgery.',
    visible: true,
  },
  {
    procedure_id: 'den-extractions',
    section_group: 'Dental & Orthodontics',
    procedure_name: 'Extractions',
    description:
      'Removal of a tooth that can usually be taken out without complex surgery. Common dental procedure; usually minor, but every case is unique.',
    visible: true,
  },
  {
    procedure_id: 'den-fillings-sealants',
    section_group: 'Dental & Orthodontics',
    procedure_name: 'Fillings/sealants',
    description:
      'Fillings repair cavities or damaged tooth surfaces, while sealants are thin protective coatings placed on chewing surfaces to help prevent cavities. Common preventive and restorative dental care; usually minor.',
    visible: true,
  },
  {
    procedure_id: 'den-fluoride',
    section_group: 'Dental & Orthodontics',
    procedure_name: 'Fluoride treatment',
    description:
      'Fluoride is applied to teeth to help strengthen enamel and reduce cavity risk. Simple preventive treatment.',
    visible: true,
  },
  {
    procedure_id: 'den-imaging',
    section_group: 'Dental & Orthodontics',
    procedure_name: 'Imaging',
    description:
      'Dental imaging includes X-rays (bitewing, panoramic, periapical) and sometimes 3D CBCT scans to find decay, infection, bone loss, impacted teeth, or to plan implant or orthodontic treatment. Common diagnostic testing.',
    visible: true,
  },
  {
    procedure_id: 'den-implants-grafting',
    section_group: 'Dental & Orthodontics',
    procedure_name: 'Implants/grafting',
    description:
      'Dental implants place a metal post in the jawbone to support a replacement tooth; bone grafting may be used to strengthen the jaw before or during implant treatment. Common dental surgery; complexity depends on bone health and number of implants.',
    visible: true,
  },
  {
    procedure_id: 'den-oral-cancer-screening',
    section_group: 'Dental & Orthodontics',
    procedure_name: 'Oral cancer screening',
    description:
      'A dentist or doctor examines the mouth for signs of cancer or precancerous changes. Common exam component; not surgery.',
    visible: true,
  },
  {
    procedure_id: 'den-root-canal',
    section_group: 'Dental & Orthodontics',
    procedure_name: 'Root canal',
    description:
      'Treatment that removes infected or damaged nerve tissue from inside a tooth to save it. Front-tooth and premolar root canals are usually moderate; molar root canals are more complex because of multiple canals.',
    visible: true,
  },
  {
    procedure_id: 'den-veneers',
    section_group: 'Dental & Orthodontics',
    procedure_name: 'Veneers',
    description:
      'Thin custom-made shells of porcelain or composite bonded to the front of teeth to improve appearance — color, shape, length, or alignment. Common cosmetic dental procedure; minimal tooth preparation in many cases.',
    visible: true,
  },
  {
    procedure_id: 'den-xray',
    section_group: 'Dental & Orthodontics',
    procedure_name: 'X-ray',
    description:
      'Dental X-rays create images of teeth, roots, bone, and surrounding structures to find decay, infection, bone loss, or impacted teeth. Common diagnostic test.',
    visible: true,
  },

  // Fertility & Women's Health
  {
    procedure_id: 'fer-bone-density-testing',
    section_group: 'Fertility & Women’s Health',
    procedure_name: 'Bone density testing',
    description:
      'A DEXA scan uses low-dose X-rays to measure bone strength and screen for osteoporosis. Non-surgical diagnostic test; usually quick and painless.',
    visible: true,
  },
  {
    procedure_id: 'fer-hrt',
    section_group: 'Fertility & Women’s Health',
    procedure_name: 'HRT (Hormone replacement therapy)',
    description:
      'Treatment that replaces hormones the body no longer makes in adequate amounts, most often estrogen and progesterone during or after menopause. Non-surgical; available as pills, patches, gels, or other forms.',
    visible: true,
  },
  {
    procedure_id: 'fer-hysterectomy',
    section_group: 'Fertility & Women’s Health',
    procedure_name: 'Hysterectomy',
    description:
      'Surgery to remove the uterus; sometimes the cervix, ovaries, or fallopian tubes may also be removed. Usually considered major surgery; every case is unique.',
    visible: true,
  },
  {
    procedure_id: 'fer-hysteroscopy',
    section_group: 'Fertility & Women’s Health',
    procedure_name: 'Hysteroscopy',
    description:
      'A procedure using a thin camera through the cervix to look inside the uterus and sometimes treat minor uterine problems. Often minor or diagnostic; every case is unique.',
    visible: true,
  },
  {
    procedure_id: 'fer-mammogram',
    section_group: 'Fertility & Women’s Health',
    procedure_name: 'Mammogram',
    description:
      'A low-dose breast X-ray used to look for breast cancer. Screening mammograms are done routinely before symptoms appear; diagnostic mammograms are used when there is a symptom or abnormal screening result. Common imaging test.',
    visible: true,
  },
  {
    procedure_id: 'fer-oophorectomy',
    section_group: 'Fertility & Women’s Health',
    procedure_name: 'Oophorectomy (ovary removal)',
    description:
      'Surgery to remove one or both ovaries, sometimes performed alongside hysterectomy or for ovarian conditions and cancer risk. Usually considered moderate to major surgery; every case is unique.',
    visible: true,
  },
  {
    procedure_id: 'fer-pap-hpv-std-testing',
    section_group: 'Fertility & Women’s Health',
    procedure_name: 'Pap/HPV/STD testing',
    description:
      "Routine women's health testing that may include a Pap smear (cervical cell sample), HPV test (high-risk human papillomavirus), and screening for sexually transmitted infections. Simple office-based tests; not surgery.",
    visible: true,
  },
  {
    procedure_id: 'fer-tubal-ligation',
    section_group: 'Fertility & Women’s Health',
    procedure_name: 'Tubal ligation',
    description:
      'A permanent birth control procedure that blocks or seals the fallopian tubes. Common procedure; usually considered minor to moderate surgery depending on method.',
    visible: true,
  },
  {
    procedure_id: 'fer-ultrasound',
    section_group: 'Fertility & Women’s Health',
    procedure_name: 'Ultrasound',
    description:
      'Imaging that uses sound waves to view organs, tissues, blood flow, or pregnancy. Non-surgical diagnostic test; usually low risk.',
    visible: true,
  },

  // Orthopedic
  {
    procedure_id: 'ort-acl-reconstruction',
    section_group: 'Orthopedic',
    procedure_name: 'ACL reconstruction',
    description:
      'Surgery to rebuild a torn anterior cruciate ligament, one of the main stabilizing ligaments in the knee. Common sports-related surgery; complexity depends on injury pattern.',
    visible: true,
  },
  {
    procedure_id: 'ort-carpal-tunnel',
    section_group: 'Orthopedic',
    procedure_name: 'Carpal tunnel',
    description:
      'Surgery to relieve pressure on the median nerve at the wrist, often used for carpal tunnel syndrome. Common procedure; usually considered minor surgery, but every case is unique.',
    visible: true,
  },
  {
    procedure_id: 'ort-elbow-replacement',
    section_group: 'Orthopedic',
    procedure_name: 'Elbow replacement',
    description:
      'Surgery to replace damaged parts of the elbow joint with artificial parts. Less common than hip or knee replacement; usually considered major surgery.',
    visible: true,
  },
  {
    procedure_id: 'ort-hip-replacement',
    section_group: 'Orthopedic',
    procedure_name: 'Hip replacement',
    description:
      'Surgery to replace damaged parts of the hip joint with artificial parts. Very common procedure; usually considered major orthopedic surgery, but every case is unique.',
    visible: true,
  },
  {
    procedure_id: 'ort-knee-replacement',
    section_group: 'Orthopedic',
    procedure_name: 'Knee replacement',
    description:
      'Surgery to replace damaged parts of the knee joint with artificial parts. Very common procedure; usually considered major orthopedic surgery, but every case is unique.',
    visible: true,
  },
  {
    procedure_id: 'ort-meniscus-arthroscopy',
    section_group: 'Orthopedic',
    procedure_name: 'Meniscus arthroscopy',
    description:
      'A minimally invasive knee procedure using a small camera to trim or repair torn meniscus cartilage. Common procedure; often outpatient, but every case is unique.',
    visible: true,
  },
  {
    procedure_id: 'ort-rotator-cuff-repair',
    section_group: 'Orthopedic',
    procedure_name: 'Rotator cuff repair',
    description:
      'Surgery to repair torn tendons around the shoulder. Common procedure; complexity depends on tear size and tissue quality.',
    visible: true,
  },
  {
    procedure_id: 'ort-shoulder-replacement',
    section_group: 'Orthopedic',
    procedure_name: 'Shoulder replacement',
    description:
      'Surgery to replace damaged parts of the shoulder joint with artificial parts. Usually considered major orthopedic surgery; every case is unique.',
    visible: true,
  },
  {
    procedure_id: 'ort-spinal-fusion',
    section_group: 'Orthopedic',
    procedure_name: 'Spinal fusion',
    description:
      'Surgery that joins two or more bones in the spine to reduce painful movement or improve stability. Usually considered major surgery; every case is unique.',
    visible: true,
  },

  // Preventative Care/Wellness
  {
    procedure_id: 'pre-annual-physical',
    section_group: 'Preventative Care/Wellness',
    procedure_name: 'Annual physical exam',
    description:
      'A yearly checkup that reviews health history, vital signs, risk factors, medications, and recommended screenings. Preventive visit; not a procedure.',
    visible: true,
  },
  {
    procedure_id: 'pre-blood-panels',
    section_group: 'Preventative Care/Wellness',
    procedure_name: 'Blood panels',
    description:
      'Routine and advanced blood tests check general health, organ function, infection markers, hormones, cholesterol, blood sugar, anemia, and more. Non-surgical diagnostic testing; complexity depends on the panel.',
    visible: true,
  },
  {
    procedure_id: 'pre-bone-density',
    section_group: 'Preventative Care/Wellness',
    procedure_name: 'Bone density',
    description:
      'A DEXA scan measures bone strength to screen for osteoporosis and assess fracture risk. Non-surgical diagnostic test; usually quick and painless.',
    visible: true,
  },
  {
    procedure_id: 'pre-colonoscopy',
    section_group: 'Preventative Care/Wellness',
    procedure_name: 'Colonoscopy',
    description:
      'A procedure using a flexible camera to examine the colon and rectum; polyps may be removed during the same exam. Common procedure; usually diagnostic or preventive, with sedation in many cases.',
    visible: true,
  },
  {
    procedure_id: 'pre-comprehensive-exam',
    section_group: 'Preventative Care/Wellness',
    procedure_name: 'Comprehensive exam',
    description:
      'A broader health review that goes beyond a standard physical, often including detailed labs, lifestyle review, risk screening, and a personalized prevention plan. Non-surgical evaluation; scope varies by program.',
    visible: true,
  },
  {
    procedure_id: 'pre-ct-scan',
    section_group: 'Preventative Care/Wellness',
    procedure_name: 'CT scan',
    description:
      'Computed tomography uses X-rays and computer processing to create detailed cross-sectional images. Non-surgical diagnostic test; may involve contrast dye.',
    visible: true,
  },
  {
    procedure_id: 'pre-endoscopy',
    section_group: 'Preventative Care/Wellness',
    procedure_name: 'Endoscopy',
    description:
      'Upper endoscopy uses a flexible camera to examine the esophagus, stomach, and first part of the small intestine. Common diagnostic procedure; usually not considered major surgery.',
    visible: true,
  },
  {
    procedure_id: 'pre-genetics-screening',
    section_group: 'Preventative Care/Wellness',
    procedure_name: 'Genetics screening',
    description:
      'Testing of a blood or saliva sample to look for inherited gene changes linked to conditions such as cancer, heart disease, or other risks. Non-surgical; results can guide screening and prevention decisions.',
    visible: true,
  },
  {
    procedure_id: 'pre-metabolic-testing',
    section_group: 'Preventative Care/Wellness',
    procedure_name: 'Metabolic testing',
    description:
      'Tests that measure how the body uses energy and processes nutrients — including resting metabolic rate, blood sugar response, hormones, and lipid panels. Non-surgical; results help guide nutrition and fitness planning.',
    visible: true,
  },
  {
    procedure_id: 'pre-mri',
    section_group: 'Preventative Care/Wellness',
    procedure_name: 'MRI',
    description:
      'Magnetic resonance imaging uses magnets and radio waves to create detailed images inside the body. Non-surgical diagnostic test; complexity depends on body area and contrast use.',
    visible: true,
  },
  {
    procedure_id: 'pre-ultrasound',
    section_group: 'Preventative Care/Wellness',
    procedure_name: 'Ultrasound',
    description:
      'Imaging that uses sound waves to view organs, tissues, blood flow, or pregnancy. Non-surgical diagnostic test; usually low risk.',
    visible: true,
  },
  {
    procedure_id: 'pre-vaccinations',
    section_group: 'Preventative Care/Wellness',
    procedure_name: 'Vaccinations',
    description:
      'Vaccines help the immune system protect against specific infections. Preventive care; usually simple injection or oral/nasal administration.',
    visible: true,
  },
  {
    procedure_id: 'pre-xray',
    section_group: 'Preventative Care/Wellness',
    procedure_name: 'X-ray',
    description:
      'Imaging that uses a small amount of radiation to view bones, chest, abdomen, or other structures. Common diagnostic test; usually quick and non-surgical.',
    visible: true,
  },
];

const collectUniqueValues = (procedures, key) => {
  const values = new Set();
  for (const procedure of procedures) {
    const value = procedure[key];
    if (Array.isArray(value)) {
      for (const item of value) {
        const trimmed = String(item || '').trim();
        if (trimmed) values.add(trimmed);
      }
    } else if (value !== undefined && value !== null && value !== '') {
      values.add(String(value).trim());
    }
  }
  return Array.from(values).sort((a, b) => a.localeCompare(b));
};

const visibleProcedures = PROCEDURES.filter((procedure) => procedure.visible !== false);

export const PROCEDURES_VISIBLE = visibleProcedures;

export const PROCEDURES_FILTERS = {
  section_group: collectUniqueValues(visibleProcedures, 'section_group'),
};

export const PROCEDURES_COLUMN_CONFIG = {
  procedure_name: {
    label: 'Procedure',
    behavior: 'card-display',
    searchable: true,
    cardLabel: '',
    cardOrder: 1,
    maxLength: 200,
  },
  description: {
    label: 'Description',
    behavior: 'card-display',
    searchable: true,
    cardLabel: '',
    cardOrder: 2,
    maxLength: 1000,
  },
  section_group: {
    label: 'Speciality',
    behavior: 'filter-only',
    searchable: true,
    cardLabel: '',
    cardOrder: 3,
    maxLength: 120,
  },
};
