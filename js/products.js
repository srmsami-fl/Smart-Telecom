/* =====================================================================
   কন্ট্রোল প্যানেল — এই ফাইলেই যোগাযোগ, সোশ্যাল লিংক, টিম ও সব পণ্য বদলান।
   ===================================================================== */
const SITE = {
  name: "Smart Telecom",
  url: "https://YOUR-USERNAME.github.io/YOUR-REPO",   // GitHub Pages লিংক বসান (শেয়ার লিংকের জন্য জরুরি)
  phone: "01917-237409",
  whatsapp: "8801917237409",
  email: "smarttelecom.gb@gmail.com",
  address: ["সরকারি রোড, গাইবান্ধা ৫৭০০", "Sarkular Rode, Gaibandha 5700"],
  formspree: "https://formspree.io/f/xrppvyyq",
  bkash: "01917-237409",
  facebook: "https://www.facebook.com/61594952698940",
  tiktok: "https://www.tiktok.com/@smarttelecom.bd"
};

/* টিম: img = "assets/team/jahid.jpg" (ছবি ঐ ফোল্ডারে রাখুন), ফাঁকা থাকলে নামের অক্ষর দেখাবে */
const TEAM = [
  { name: ["Jahid", "Jahid"], role: "CEO", img: "", bio: ["ব্যবসার দিকনির্দেশনা ও সততার নীতি নিশ্চিত করেন।", "Sets the direction and keeps our honesty standards."] },
  { name: ["সামি", "Sami"], role: "MD", img: "", bio: ["দৈনন্দিন কার্যক্রম ও সার্ভিসের মান দেখভাল করেন।", "Oversees daily operations and service quality."] },
  { name: ["শাকিল", "Shakil"], role: "SR", img: "", bio: ["ক্রেতার সাথে যোগাযোগ ও পণ্য বুঝিয়ে বলায় সহায়তা করেন।", "Helps customers choose and understand products."] },
  { name: ["সজীব", "Sajib"], role: "SO", img: "", bio: ["অর্ডার প্রক্রিয়া ও কনফার্মেশনে কাজ করেন।", "Works on order processing and confirmation."] },
  { name: ["রাকিবুল", "Rakibul"], role: "SO", img: "", bio: ["অর্ডার প্রক্রিয়া ও ডেলিভারি সমন্বয়ে কাজ করেন।", "Works on order handling and delivery coordination."] },
  { name: ["ইমরান", "Imran"], role: "SO", img: "", bio: ["ক্রেতা সহায়তা ও অর্ডার ফলো-আপে কাজ করেন।", "Handles customer support and order follow-ups."] },
  { name: ["রিদয়", "Ridoy"], role: "SO", img: "", bio: ["ক্রেতা সহায়তা ও পণ্য প্রস্তুতিতে কাজ করেন।", "Supports customers and product preparation."] },
  { name: ["জাহিদুল", "Zahidul"], role: "SE", img: "", bio: ["বিক্রয় ও ক্রেতা সম্পর্কে কাজ করেন।", "Works on sales and customer relations."] }
];

const CATS = {
  button: ["বাটন ফোন", "Button Phone"],
  smart: ["স্মার্টফোন", "Smartphone"],
  audio: ["ইয়ারবাড ও ব্লুটুথ", "Earbuds & Bluetooth"],
  charger: ["চার্জার ও পাওয়ার", "Chargers & Power"],
  acc: ["অ্যাক্সেসরিজ", "Accessories"]
};

/* ডিফল্ট ছোট বর্ণনা, ফিচার ও মার্কেটিং বর্ণনা (ক্যাটাগরি অনুযায়ী)। কোনো পণ্যে নিজের লিখলে সেটাই দেখাবে। */
const DEF = {
  button: {
    d: ["ডুয়াল সিম, দীর্ঘস্থায়ী ব্যাটারি ও সহজ ব্যবহার—প্রতিদিনের কলিং-এর নির্ভরযোগ্য সঙ্গী।", "Dual SIM, long battery life and simple use—a dependable daily calling companion."],
    f: [["ডুয়াল সিম সাপোর্ট", "Dual SIM support"], ["দীর্ঘস্থায়ী ব্যাটারি", "Long-lasting battery"], ["টর্চ ও এফএম রেডিও", "Torch & FM radio"], ["মেমোরি কার্ড সাপোর্ট", "Memory card support"]],
    l: t => [`নেটওয়ার্ক, চার্জ আর ঝামেলা নিয়ে চিন্তা না করে শুধু কথা বলতে চান? ${t} ঠিক সেটাই দেয়। সহজ বাটন, জোরালো সাউন্ড আর ব্যাটারি—যা একবার চার্জে দিনের পর দিন সঙ্গ দেয়। বাবা-মা, কর্মজীবী, কৃষক কিংবা ব্যাকআপ ফোন—সবার জন্য এটি সেরা বাজেট-সঙ্গী। আজই অর্ডার করুন, আমরা কল করে সব বুঝিয়ে দেব।`, `Want to just talk, without worrying about network, apps or charging? ${t} does exactly that. Easy keys, loud sound and a battery that keeps going. Great for parents, workers, farmers or as a backup phone. Order today and we'll call to walk you through everything.`]
  },
  smart: {
    d: ["স্মুথ পারফরম্যান্স, ভালো ক্যামেরা ও ব্যাটারি ব্যাকআপ—বাজেটে আধুনিক স্মার্টফোনের অভিজ্ঞতা।", "Smooth performance, a capable camera and solid battery—a modern smartphone experience on budget."],
    f: [["ফেসবুক, ইউটিউব ও টিকটক সাবলীল", "Smooth for Facebook, YouTube & TikTok"], ["ফিঙ্গারপ্রিন্ট ও ফেস আনলক", "Fingerprint & face unlock"], ["ভালো ক্যামেরা সেটআপ", "Capable camera setup"], ["সারাদিনের ব্যাটারি", "All-day battery"]],
    l: t => [`ফেসবুকে ভিডিও দেখা, ছবি তোলা, অনলাইন ক্লাস কিংবা ব্যবসার কাজ—সবকিছুর জন্য ${t} তৈরি। বড় স্ক্রিনে দেখার আনন্দ, শক্তিশালী ব্যাটারিতে সারাদিনের নিশ্চিন্ততা আর দ্রুত অ্যাপ চলার স্বস্তি—সব মিলিয়ে দামের তুলনায় বাড়তি মূল্য। নতুন ফোনের অভিজ্ঞতা নিতে আজই অর্ডার করুন; পণ্য হাতে পেয়ে দেখে-বুঝে টাকা দিন।`, `Watching videos, taking photos, online classes or running a business—${t} is built for it. A big screen, a battery for the whole day and apps that open quickly add up to real value for the price. Order today and pay only after you've inspected it.`]
  },
  audio: {
    d: ["ক্লিয়ার সাউন্ড ও ঝামেলাহীন ওয়্যারলেস কানেকশন—গান, কল বা ভিডিওর জন্য।", "Clear sound and hassle-free wireless connection for music, calls and video."],
    f: [["ব্লুটুথ ওয়্যারলেস কানেকশন", "Bluetooth wireless"], ["ক্লিয়ার কলের জন্য মাইক", "Built-in mic for calls"], ["হালকা ও আরামদায়ক", "Light & comfortable"], ["দ্রুত পেয়ার", "Quick pairing"]],
    l: t => [`তার জড়ানোর দিন শেষ। ${t} দিয়ে গান, ভিডিও কিংবা ফোনকল—সবকিছু হোক স্বাধীনভাবে। হালকা ডিজাইন, পরিষ্কার সাউন্ড আর সহজ পেয়ারিং; ভ্রমণে, অফিসে বা ব্যায়ামে—সবখানেই সঙ্গী। আপনার ফোনের সাথে মানানসই আরেকটি স্মার্ট সিদ্ধান্ত।`, `No more tangled wires. With ${t}, enjoy music, video and calls freely. Light design, clear sound and easy pairing—perfect for travel, work or workouts.`]
  },
  charger: {
    d: ["নিরাপদ ও দ্রুত চার্জিং—ফোনের সুরক্ষায় মানসম্মত পণ্য।", "Safe, fast charging—quality gear that protects your phone."],
    f: [["দ্রুত ও নিরাপদ চার্জিং", "Fast & safe charging"], ["টেকসই নির্মাণ", "Durable build"], ["বেশিরভাগ ফোনের সাথে সামঞ্জস্য", "Works with most phones"]],
    l: t => [`ফোন সবসময় চার্জে থাকুক, নিরাপদে। ${t} আপনার ফোনের ব্যাটারির যত্ন নিয়ে দ্রুত চার্জ দেয়। ঘরে, অফিসে বা ভ্রমণে—পাওয়ারের চিন্তা বাদ। সঠিক এক্সেসরি ফোনের আয়ু বাড়ায়; তাই সস্তা নয়, ভরসাযোগ্য বেছে নিন।`, `Keep your phone powered, safely. ${t} charges efficiently while caring for your battery—at home, work or on the road. The right accessory extends your phone's life, so choose reliable over cheap.`]
  },
  acc: {
    d: ["ফোনের সুরক্ষা ও সুবিধায় দরকারি অ্যাক্সেসরি।", "A handy accessory for protecting and getting more from your phone."],
    f: [["সহজে লাগানো যায়", "Easy to fit"], ["ফোনের সুরক্ষা", "Protects your phone"], ["টেকসই মান", "Durable quality"]],
    l: t => [`নতুন ফোনের সৌন্দর্য ও আয়ু বাঁচিয়ে রাখতে ছোট্ট একটি সুরক্ষাই যথেষ্ট। ${t} আপনার ফোনকে রাখবে নিরাপদ আর ব্যবহারকে করবে আরও সহজ। ফোনের মডেল জানিয়ে অর্ডার করুন, আমরা মিলিয়ে পাঠাব।`, `A small protection goes a long way to keep your new phone looking good and lasting longer. ${t} keeps it safe and makes it easier to use. Tell us your phone model when ordering and we'll match it.`]
  }
};

/* =====================================================================
   পণ্য যোগ করার নিয়ম:
   P("ক্যাটাগরি","ব্র্যান্ড","টাইটেল", দাম, পুরোনো_দাম, "ছবি", { d:[বাংলা,English], l:[বাংলা,English], f:[...ফিচার], s:[["Display","6.6 inch"],...] })
   • দাম 0 দিলে ওয়েবসাইটে "কল করে দাম জানুন" দেখাবে।   • d, l, f, s না দিলে ক্যাটাগরির ডিফল্ট ব্যবহার হবে।
   • ছবি: assets/products/ এ রেখে "assets/products/phone1.jpg"। ফাঁকা থাকলে প্লেসহোল্ডার।
   • প্রতিটি পণ্যের শেয়ার লিংক নিজে নিজেই তৈরি হয় (টাইটেল থেকে)।
   • বাজারদর বদলায়—প্রকাশের আগে দাম ও স্পেক অফিসিয়াল সোর্স থেকে মিলিয়ে নিন।
   ===================================================================== */
const PRODUCTS = [];
const slug = s => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
function P(cat, brand, title, price, old = 0, img = "", x = {}) {
  const D = DEF[cat];
  PRODUCTS.push({ id: slug(brand + "-" + title), cat, brand, title, price, old, img, d: x.d || D.d, l: x.l || D.l(title), f: x.f || D.f, s: x.s || [] });
}

/* ---------- বাটন ফোন ---------- */
P("button", "Itel", "Itel Button Phone", 0, 0, "assets/hero.png");
P("button", "Symphony", "Symphony D11", 1290, 0, "", { d: ["২.৪ ইঞ্চি ডিসপ্লে, ডুয়াল সিম ও ১০০০mAh ব্যাটারির সহজ ফিচার ফোন।", "A simple feature phone with a 2.4\" display, dual SIM and 1000mAh battery."], s: [["Display", "2.4\" 240×320"], ["Battery", "1000mAh removable"], ["SIM", "Dual SIM (2G)"], ["Memory card", "Up to 16GB"], ["Colours", "Ink Black, Forest Green, Navy Blue"]] });
P("button", "Walton", "Walton Olvio MM25", 1200);
P("button", "Winstar", "Winstar Button Phone", 0);
P("button", "Taitanic", "Taitanic Button Phone", 0);
P("button", "Bontel", "Bontel Button Phone", 0);
P("button", "5 Star", "5 Star Button Phone", 0);
P("button", "Migo", "Migo Button Phone", 0);
P("button", "GDL", "GDL Button Phone", 0);
P("button", "Lava", "Lava Button Phone", 0);
P("button", "Marsel", "Marsel Button Phone", 0);
P("button", "Marlex", "Marlex Button Phone", 0);
P("button", "Bangol", "Bangol Button Phone", 0);
P("button", "Lenex", "Lenex Button Phone", 0);
P("button", "Gretel", "Gretel Button Phone", 0);

/* ---------- স্মার্টফোন (দাম ও স্পেক বাংলাদেশের অফিসিয়াল লিস্টিং অনুযায়ী) ---------- */
P("smart", "Itel", "itel A200 Plus", 12490, 0, "", { d: ["৬০০০mAh ব্যাটারি, ১২০Hz ডিসপ্লে ও IP65 সুরক্ষা—আলট্রা-স্লিম বডিতে।", "6000mAh battery, 120Hz display and IP65 protection in an ultra-slim body."], s: [["Display", "6.75\" HD+ (120Hz)"], ["Battery", "6000mAh, 18W wired charging"], ["Chipset", "Unisoc T7250"], ["OS", "Android 15"], ["RAM/Storage", "4GB + 64GB (128GB: ৳13,990)"], ["Durability", "IP65"], ["Network", "4G LTE"]] });
P("smart", "Itel", "itel City 200", 13990, 0, "", { d: ["৫০MP AI ক্যামেরা, ১২০Hz স্ক্রিন, মিলিটারি-গ্রেড টেকসই ও পাতলা ইউনিবডি।", "50MP AI camera, 120Hz screen, military-grade durability in a slim unibody."], s: [["Display", "6.78\" HD+ (120Hz)"], ["Camera", "50MP AI"], ["RAM/Storage", "6GB + 128GB"], ["Chipset", "Unisoc T7250"], ["Body", "7.45mm, IP65"]] });
P("smart", "Itel", "itel Power 80", 18490, 0, "", { d: ["৭০০০mAh মেগা ব্যাটারি, IP68/IP69 সুরক্ষা ও ৫০MP ক্যামেরা।", "7000mAh mega battery, IP68/IP69 protection and 50MP camera."], s: [["Battery", "7000mAh"], ["Camera", "50MP rear"], ["RAM/Storage", "6GB + 128GB"], ["Durability", "IP68 / IP69"]] });
P("smart", "Itel", "itel Super 26 Ultra", 19990, 0, "", { d: ["কার্ভড ডিসপ্লে, ৮GB RAM ও ৬০০০mAh ব্যাটারি—প্রিমিয়াম লুকে বাজেট ফোন।", "Curved display, 8GB RAM and 6000mAh battery—premium looks on a budget."], s: [["RAM/Storage", "8GB + 128GB (256GB: ৳21,990)"], ["Display", "Curved"], ["Battery", "6000mAh"]] });
P("smart", "Symphony", "Symphony Max 30", 10499, 0, "", { d: ["৫০০০mAh ব্যাটারি, ফিঙ্গারপ্রিন্ট ও ফেস আনলক—বাংলাদেশে তৈরি বাজেট স্মার্টফোন।", "5000mAh battery, fingerprint and face unlock—a budget smartphone made in Bangladesh."], s: [["Display", "6.56\" HD+ IPS, Gorilla Glass"], ["Chipset", "Unisoc T603"], ["OS", "Android 16"], ["RAM/Storage", "3GB + 64GB (expandable to 256GB)"], ["Battery", "5000mAh"], ["Security", "Side fingerprint, Face unlock"], ["Splash proof", "IP52"]] });
P("smart", "Symphony", "Symphony Max 60", 10999);
P("smart", "Symphony", "Symphony Innova 40", 12999);
P("smart", "Walton", "Walton Primo HM6", 7599);
P("smart", "Honor", "Honor X-Series Smartphone", 0);
P("smart", "Oppo", "Oppo A6 Pro", 0, 0, "", { d: ["৬.৫৭ ইঞ্চি ১২০Hz AMOLED ডিসপ্লে ও ৫০০০mAh ব্যাটারি।", "6.57\" 120Hz AMOLED display and a 5000mAh battery."], s: [["Display", "6.57\" 120Hz AMOLED"], ["Battery", "5000mAh"]] });
P("smart", "Villaon", "Villaon Smartphone", 0);
P("smart", "Coolpad", "Coolpad Smartphone", 0);
P("smart", "Hallio", "Hallio Smartphone", 0);
P("smart", "Realme", "realme 16T", 33000);
P("smart", "Xiaomi", "Xiaomi Redmi Note 15 5G", 36999, 0, "", { d: ["৫G সাপোর্ট ও ১০৮MP ক্যামেরাসহ রেডমি নোট সিরিজের নতুন সংস্করণ।", "The newest Redmi Note with 5G support and a 108MP camera."], s: [["Network", "5G"], ["Camera", "108MP"]] });
P("smart", "Vivo", "Vivo V-Series Smartphone", 0);
P("smart", "Samsung", "Samsung Galaxy Smartphone", 0);
P("smart", "W & O", "W & O Smartphone", 0);
P("smart", "5 Star", "5 Star Smartphone", 0);

/* ---------- ইয়ারবাড, চার্জার, অ্যাক্সেসরিজ ---------- */
P("audio", "Generic", "Wireless Earbuds (TWS)", 0);
P("audio", "Generic", "Bluetooth Neckband", 0);
P("audio", "Generic", "Bluetooth Speaker (Mini)", 0);
P("charger", "Generic", "Fast Charger 20W", 0);
P("charger", "Generic", "Power Bank 10000mAh", 0);
P("charger", "Generic", "USB Data Cable (Type-C)", 0);
P("acc", "Generic", "Phone Back Cover", 0);
P("acc", "Generic", "Tempered Glass Protector", 0);
P("acc", "Generic", "Phone Holder / Stand", 0);
