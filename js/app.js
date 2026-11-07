const $ = (s, r = document) => r.querySelector(s);
let lang = localStorage.lang || "bn", cart = JSON.parse(localStorage.cart || "{}");
const T = (b, e) => `<span class="bn">${b}</span><span class="en">${e}</span>`;
const L = a => a[lang == "bn" ? 0 : 1];
const bnum = n => String(n).replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[d]);
const M = n => "৳" + (lang == "bn" ? bnum(n.toLocaleString("en-US")) : n.toLocaleString("en-US"));
const PH = t => "data:image/svg+xml;utf8," + encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><rect width='400' height='400' fill='#7A367A'/><rect x='140' y='60' width='120' height='220' rx='20' fill='none' stroke='#fff' stroke-width='8'/><text x='200' y='335' fill='#fff' font-size='22' text-anchor='middle' font-family='sans-serif'>${String(t).replace(/&/g, "&amp;")}</text><text x='200' y='365' fill='#e9c9e4' font-size='14' text-anchor='middle' font-family='sans-serif'>Image placeholder</text></svg>`);
document.addEventListener("error", e => { if (e.target.tagName == "IMG" && !e.target.dataset.f) { e.target.dataset.f = 1; e.target.src = PH(e.target.alt || "Smart Telecom"); } }, true);

const NAV = [["index.html", "হোম", "Home"], ["shop.html", "শপ", "Shop"], ["how-to-order.html", "অর্ডারের নিয়ম", "How to order"], ["about.html", "আমাদের সম্পর্কে", "About"], ["terms.html", "শর্ত ও নীতিমালা", "Terms"], ["contact.html", "যোগাযোগ", "Contact"]];
const page = (location.pathname.split("/").pop() || "index.html");

function layout() {
  $("#hdr").innerHTML = `<header><div class="wrap nav">
  <a href="index.html" class="logo"><img src="assets/logo.jpg" alt="Smart Telecom logo"><span>Smart Telecom</span></a>
  <nav id="nav">${NAV.map(n => `<a href="${n[0]}" class="${n[0] == page ? "on" : ""}">${T(n[1], n[2])}</a>`).join("")}</nav>
  <button class="ic" id="lang" aria-label="Language"></button>
  <button class="ic" id="theme" aria-label="Theme"></button>
  <button class="ic" id="cartBtn" aria-label="Cart">🛒<span id="cc">0</span></button>
  <button class="ic menu" id="menu" aria-label="Menu">☰</button></div></header>`;
  $("#ftr").innerHTML = `<footer><div class="wrap"><div class="fg">
  <div><img src="assets/logo.jpg" alt="Smart Telecom"><span class="l">${T("আপনার ‘আস্থা’ আমাদের অর্জন", "Your ‘Trust’ Is Our Achievement")}</span><span class="l">${T("ভরসাযোগ্য মোবাইল ও অ্যাক্সেসরিজের ঠিকানা।", "Your address for trusted mobiles and accessories.")}</span></div>
  <div><h4>${T("পেজসমূহ", "Pages")}</h4>${NAV.map(n => `<a href="${n[0]}">${T(n[1], n[2])}</a>`).join("")}</div>
  <div><h4>${T("ক্যাটাগরি", "Categories")}</h4>${Object.entries(CATS).map(([k, v]) => `<a href="shop.html?cat=${k}">${T(v[0], v[1])}</a>`).join("")}</div>
  <div><h4>${T("যোগাযোগ", "Contact")}</h4><a href="tel:${SITE.phone}">📞 ${SITE.phone}</a><a href="https://wa.me/${SITE.whatsapp}" target="_blank" rel="noopener">💬 WhatsApp: +880 1917-237409</a><a href="mailto:${SITE.email}">✉ ${SITE.email}</a><span class="l">📍 ${T(SITE.address[0], SITE.address[1])}</span><a href="${SITE.facebook}" target="_blank" rel="noopener">👍 Facebook</a><a href="${SITE.tiktok}" target="_blank" rel="noopener">🎵 TikTok</a></div></div>
  <div class="cp">© <span id="yr"></span> Smart Telecom. ${T("সর্বস্বত্ব সংরক্ষিত।", "All rights reserved.")} · <a style="display:inline" href="terms.html">${T("শর্ত ও নীতিমালা", "Terms & Policies")}</a></div></div></footer>
  <div class="ov" id="ov"><div class="dr"><button class="ic" id="close" style="float:right">✕</button><h2>${T("আপনার কার্ট", "Your cart")}</h2><div id="cartBody"></div></div></div>
  <div id="toast"></div>`;
  $("#yr").textContent = new Date().getFullYear();
}

const PRC = p => p.price ? `${M(p.price)}${p.old ? `<s>${M(p.old)}</s>` : ""}` : `<span style="font-size:1rem">${T("কল করে দাম জানুন", "Call for price")}</span>`;
const LINK = p => `product.html?p=${p.id}`;
const FULL = p => (SITE.url.includes("YOUR-") ? location.origin + location.pathname.replace(/[^/]*$/, "") : SITE.url.replace(/\/$/, "") + "/") + LINK(p);
function card(p) {
  return `<article class="card"><a href="${LINK(p)}"><img src="${p.img || PH(p.title)}" alt="${p.title}" loading="lazy"></a><button class="share" data-s="${p.id}" aria-label="Share" title="Share link">🔗</button><div class="cb"><span class="brand">${p.brand}</span><h3><a href="${LINK(p)}">${p.title}</a></h3><p class="d">${L(p.d)}</p><span class="pr">${PRC(p)}</span><div class="bt"><button class="btn" data-a="${p.id}">${T("কার্টে যোগ করুন", "Add to cart")}</button><a class="btn o" href="${LINK(p)}">${T("বিস্তারিত", "Details")}</a></div></div></article>`;
}
function featured() {
  const el = $("#feat"); if (!el) return;
  const pick = ["Itel", "Symphony", "Walton", "Realme", "Samsung", "Xiaomi", "Vivo", "Oppo"];
  const list = []; pick.forEach((b, i) => { const p = PRODUCTS.find(x => x.brand == b && x.cat == (i < 3 ? "button" : "smart")); if (p) list.push(p); });
  el.innerHTML = list.concat(PRODUCTS.filter(p => p.cat == "audio").slice(0, 2)).map(card).join("");
}
function brandChips() {
  [["button", "#b1"], ["smart", "#b2"]].forEach(([c, s]) => { const el = $(s); if (el) el.innerHTML = [...new Set(PRODUCTS.filter(p => p.cat == c).map(p => p.brand))].map(b => `<a href="shop.html?cat=${c}&q=${encodeURIComponent(b)}">${b}</a>`).join(""); });
}
let cat = new URLSearchParams(location.search).get("cat") || "all";
function shop() {
  const g = $("#grid"); if (!g) return;
  const q = $("#q").value.toLowerCase().trim();
  $("#cats").innerHTML = Object.entries({ all: ["সব", "All"], ...CATS }).map(([k, v]) => `<button class="${k == cat ? "on" : ""}" data-c="${k}">${T(v[0], v[1])}</button>`).join("");
  const s = $("#sort").value;
  let list = PRODUCTS.filter(p => (cat == "all" || p.cat == cat) && (p.title + p.brand + p.d.join("")).toLowerCase().includes(q));
  if (s == "lo") list.sort((a, b) => a.price - b.price); if (s == "hi") list.sort((a, b) => b.price - a.price);
  $("#cnt").textContent = (lang == "bn" ? bnum(list.length) : list.length) + (lang == "bn" ? "টি পণ্য" : " products");
  g.innerHTML = list.length ? list.map(card).join("") : `<p class="empty">${T("কোনো পণ্য পাওয়া যায়নি।", "No products found.")}</p>`;
}
function copyText(t) { (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(() => toast(lang == "bn" ? "লিংক কপি হয়েছে ✔" : "Link copied ✔")).catch(() => prompt("Copy link:", t)); }
function shareProduct(id) { const p = PRODUCTS.find(x => x.id == id), u = FULL(p); if (navigator.share && /Mobi|Android/i.test(navigator.userAgent)) navigator.share({ title: p.title, text: p.title + " – Smart Telecom", url: u }).catch(() => {}); else copyText(u); }
function productPage() {
  const el = $("#pp"); if (!el) return;
  const p = PRODUCTS.find(x => x.id == new URLSearchParams(location.search).get("p"));
  if (!p) { el.innerHTML = `<div class="wrap"><p class="empty">${T("পণ্যটি পাওয়া যায়নি।", "Product not found.")} <a href="shop.html" style="color:var(--p1)">${T("শপে ফিরুন", "Back to shop")}</a></p></div>`; return; }
  document.title = `${p.title} – Smart Telecom`; const u = FULL(p), tx = encodeURIComponent(`${p.title} – Smart Telecom\n${u}`);
  const fe = p.f.map(f => `<li>${typeof f == "string" ? f : T(f[0], f[1])}</li>`).join("");
  const sp = p.s.length ? `<h3>${T("স্পেসিফিকেশন", "Specifications")}</h3><table class="spec">${p.s.map(r => `<tr><th>${r[0]}</th><td>${r[1]}</td></tr>`).join("")}</table>` : "";
  const rel = PRODUCTS.filter(x => x.cat == p.cat && x.id != p.id).slice(0, 4).map(card).join("");
  el.innerHTML = `<div class="wrap"><p class="crumb"><a href="index.html">${T("হোম", "Home")}</a> / <a href="shop.html?cat=${p.cat}">${T(...CATS[p.cat])}</a> / ${p.title}</p>
  <div class="two" style="align-items:start"><img class="pimg" src="${p.img || PH(p.title)}" alt="${p.title}">
  <div><span class="brand">${p.brand}</span><h1 style="font-size:clamp(1.6rem,4vw,2.3rem);margin:4px 0 10px">${p.title}</h1><p class="pr" style="font-size:1.7rem">${PRC(p)}</p>
  <p class="sub" style="margin:12px 0">${L(p.d)}</p>
  <div class="bt"><button class="btn" data-a="${p.id}">🛒 ${T("কার্টে যোগ করুন", "Add to cart")}</button><button class="btn o" data-a="${p.id}" data-bn="1">${T("এখনই অর্ডার", "Order now")}</button></div>
  <div class="shr"><b>${T("শেয়ার করুন:", "Share:")}</b><button class="ic" data-cp="${p.id}">🔗 ${T("লিংক কপি", "Copy link")}</button><a class="ic" target="_blank" rel="noopener" href="https://wa.me/?text=${tx}">WhatsApp</a><a class="ic" target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}">Facebook</a></div>
  <p class="note">✔ ${T("ক্যাশ অন ডেলিভারি", "Cash on delivery")} &nbsp; ✔ ${T("কনফার্মেশন কলের পর শিপমেন্ট", "Shipped after confirmation call")} &nbsp; ✔ ${T("বিকাশ পেমেন্ট সুবিধা", "bKash option")}</p></div></div>
  <div class="two" style="align-items:start;margin-top:40px"><div class="box"><h3>${T("পণ্য সম্পর্কে", "About this product")}</h3><p>${L(p.l)}</p></div><div class="box"><h3>${T("প্রধান ফিচার", "Key features")}</h3><ul>${fe}</ul>${sp}</div></div>
  <div class="box" style="margin-top:24px"><h3>${T("কেনার আগে জেনে নিন", "Before you buy")}</h3><p>${T("ছবি ও বর্ণনা ধারণার জন্য; রঙ বা ভ্যারিয়েন্টে সামান্য পার্থক্য থাকতে পারে। চূড়ান্ত দাম, স্টক ও ওয়ারেন্টি কনফার্মেশন কলে জানানো হবে। ডেলিভারির সময়ই পার্সেল খুলে দেখে নিন।", "Images and descriptions are indicative; colour or variant may differ slightly. Final price, stock and warranty are confirmed on the call. Inspect the parcel at delivery.")}</p></div>
  ${rel ? `<h2 style="margin:40px 0 18px">${T("আরও দেখুন", "You may also like")}</h2><div class="grid">${rel}</div>` : ""}</div>`;
}
function toast(m) { const t = $("#toast"); t.textContent = m; t.style.display = "block"; setTimeout(() => t.style.display = "none", 2400); }
cart = Object.fromEntries(Object.entries(cart).filter(([id]) => PRODUCTS.some(p => p.id == id)));
const total = () => Object.entries(cart).reduce((s, [id, q]) => s + PRODUCTS.find(x => x.id == id).price * q, 0);
function save() { localStorage.cart = JSON.stringify(cart); drawCart(); }

function drawCart() {
  const n = Object.values(cart).reduce((a, b) => a + b, 0); $("#cc").textContent = n;
  const rows = Object.entries(cart).map(([id, q]) => { const p = PRODUCTS.find(x => x.id == id); return `<div class="row"><img src="${p.img || PH(p.title)}" alt="${p.title}"><div>${p.title}<br><b>${p.price ? M(p.price) : T("কল করে দাম জানুন", "Call for price")}</b></div><span class="q"><button data-m="${id}">−</button> ${q} <button data-p="${id}">+</button></span></div>`; }).join("");
  if (!n) { $("#cartBody").innerHTML = `<p class="note">${T("কার্ট খালি। শপ থেকে পণ্য যোগ করুন।", "Your cart is empty. Add items from the shop.")}</p><a class="btn" href="shop.html" style="margin-top:14px">${T("শপে যান", "Go to shop")}</a>`; return; }
  const keep = $("#f") ? new FormData($("#f")) : null;
  $("#cartBody").innerHTML = `${rows}<div class="tot"><span>${T("মোট (ডেলিভারি চার্জ আলাদা)", "Total (delivery extra)")}</span><span>${M(total())}</span></div>${Object.keys(cart).some(i => !PRODUCTS.find(x => x.id == i).price) ? `<p class="note">${T("যেসব পণ্যের দাম নেই, সেগুলোর দাম কনফার্মেশন কলে জানানো হবে।", "Prices for items marked “call for price” will be given on the confirmation call.")}</p>` : ""}
  <form id="f"><h3 style="margin-top:8px">${T("ডেলিভারির তথ্য", "Delivery details")}</h3>
  <label>${T("পূর্ণ নাম *", "Full name *")}</label><input name="full_name" required>
  <label>${T("ফোন নম্বর *", "Phone number *")}</label><input name="phone" required pattern="01[3-9][0-9\\-]{8,10}" inputmode="tel" placeholder="01XXXXXXXXX">
  <div class="g2"><div><label>${T("জেলা *", "District *")}</label><input name="district" required></div><div><label>${T("শহর / উপজেলা *", "City / Upazila *")}</label><input name="city" required></div>
  <div><label>${T("ডাকঘর (Post Office) *", "Post office *")}</label><input name="post_office" required></div><div><label>${T("গ্রাম / মহল্লা *", "Village / Area *")}</label><input name="village" required></div></div>
  <label>${T("পূর্ণ ঠিকানা (বাসা, রোড, ল্যান্ডমার্ক) *", "Full address (house, road, landmark) *")}</label><textarea name="address" rows="2" required></textarea>
  <label>${T("পেমেন্ট পদ্ধতি", "Payment method")}</label>
  <div class="pay"><label><input type="radio" name="payment" value="Cash on Delivery" checked>💵 ${T("ক্যাশ অন ডেলিভারি", "Cash on delivery")}</label><label><input type="radio" name="payment" value="bKash">📲 ${T("বিকাশে পেমেন্ট", "Pay via bKash")}</label></div>
  <div id="bk"><p style="font-size:.9rem">${T("বিকাশ <b>Send Money</b> করুন এই নম্বরে:", "Send money via bKash to:")} <b>${SITE.bkash}</b></p>
  <label>${T("যে নম্বর থেকে পাঠিয়েছেন *", "Number you sent from *")}</label><input name="bkash_sender" placeholder="01XXXXXXXXX">
  <label>${T("ট্রানজেকশন আইডি (TrxID) *", "Transaction ID (TrxID) *")}</label><input name="bkash_trx" placeholder="যেমন: 9A7B6C5D4E" style="text-transform:uppercase"></div>
  <label>${T("অতিরিক্ত নোট (ঐচ্ছিক)", "Extra note (optional)")}</label><textarea name="note" rows="2"></textarea>
  <button class="btn" style="width:100%;margin-top:16px" id="sub">${T("অর্ডার জমা দিন", "Place order")}</button>
  <p class="note">${T("জমা দেওয়ার পর আমরা আপনাকে কল করে অর্ডার কনফার্ম করব। ক্যাশ অন ডেলিভারিতে এখন কোনো টাকা লাগবে না।", "After submitting, we'll call to confirm. No money is needed now for cash on delivery.")}</p></form>`;
  if (keep) { const f = $("#f"); for (const [k, v] of keep.entries()) { const el = f.elements[k]; if (!el) continue; if (el.type == "radio" || el.length) { [...f.querySelectorAll(`[name=${k}]`)].forEach(r => r.checked = r.value == v); } else el.value = v; } }
  toggleBk();
}
function toggleBk() { const f = $("#f"); if (!f) return; const b = f.payment.value == "bKash"; $("#bk").style.display = b ? "block" : "none"; f.bkash_trx.required = f.bkash_sender.required = b; }

async function submitOrder(e) {
  e.preventDefault();
  const f = e.target, fd = new FormData(f);
  fd.append("_subject", "নতুন অর্ডার – Smart Telecom");
  fd.append("order_items", Object.entries(cart).map(([id, q]) => { const p = PRODUCTS.find(x => x.id == id); return `${p.title} (${p.brand}) × ${q} = ${p.price ? "৳" + p.price * q : "price on call"} | ${FULL(p)}`; }).join("\n"));
  fd.append("order_total", "৳" + total());
  $("#sub").disabled = true;
  try {
    const r = await fetch(SITE.formspree, { method: "POST", body: fd, headers: { Accept: "application/json" } });
    if (!r.ok) throw 0;
    cart = {}; localStorage.cart = "{}"; $("#cc").textContent = 0;
    $("#cartBody").innerHTML = `<div class="box" style="text-align:center;margin-top:30px"><div class="e" style="font-size:3rem">✅</div><h3>${T("অর্ডার জমা হয়েছে!", "Order submitted!")}</h3><p>${T("ধন্যবাদ! আমাদের প্রতিনিধি শীঘ্রই আপনার দেওয়া নম্বরে কল করে অর্ডার কনফার্ম করবেন।", "Thank you! Our team will call you shortly to confirm your order.")}</p></div>`;
  } catch (x) { $("#sub").disabled = false; toast(lang == "bn" ? "জমা দেওয়া যায়নি। ইন্টারনেট দেখে আবার চেষ্টা করুন বা কল করুন।" : "Couldn't submit. Check your connection or call us."); }
}

document.addEventListener("click", e => {
  const t = e.target, d = t.dataset || {};
  if (d.c) { cat = d.c; shop(); }
  if (t.closest('[data-a]')) { const k = t.closest('[data-a]').dataset.a; cart[k]=(cart[k]||0)+1; save(); toast(lang == 'bn' ? 'কার্টে যোগ হয়েছে ✔' : 'Added to cart ✔'); }
  if (false) { cart[d.a] = (cart[d.a] || 0) + 1; save(); toast(lang == "bn" ? "কার্টে যোগ হয়েছে ✔" : "Added to cart ✔"); }
  if (d.p) { cart[d.p]++; save(); } if (d.m) { if (--cart[d.m] <= 0) delete cart[d.m]; save(); }
  if (d.bn) { $("#ov").classList.add("on"); }
  if (t.closest("[data-s]")) shareProduct(t.closest("[data-s]").dataset.s);
  if (t.closest("[data-cp]")) copyText(FULL(PRODUCTS.find(x => x.id == t.closest("[data-cp]").dataset.cp)));
  if (t.id == "ov" || t.id == "close") $("#ov").classList.remove("on");
  if (t.closest("#cartBtn")) $("#ov").classList.add("on");
  if (t.closest("#nav a")) $("#nav").classList.remove("on");
});
document.addEventListener("change", e => { if (e.target.name == "payment") toggleBk(); if (e.target.id == "sort") shop(); });
document.addEventListener("input", e => { if (e.target.id == "q") shop(); });
document.addEventListener("submit", e => { if (e.target.id == "f") submitOrder(e); });

function setLang() { productPage(); document.documentElement.lang = lang; $("#lang").textContent = lang == "bn" ? "EN" : "বাং"; localStorage.lang = lang; featured(); shop(); drawCart(); }
layout(); brandChips(); productPage();
const th = localStorage.theme || "dark"; document.documentElement.dataset.theme = th;
$("#theme").textContent = th == "dark" ? "☀" : "🌙";
$("#theme").onclick = () => { const d = document.documentElement.dataset.theme == "dark" ? "light" : "dark"; document.documentElement.dataset.theme = d; localStorage.theme = d; $("#theme").textContent = d == "dark" ? "☀" : "🌙"; };
$("#lang").onclick = () => { lang = lang == "bn" ? "en" : "bn"; setLang(); };
$("#menu").onclick = () => $("#nav").classList.toggle("on");
const qs = new URLSearchParams(location.search).get("q"); if (qs && $("#q")) $("#q").value = qs;
setLang();
