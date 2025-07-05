let gorevler = [];

//JS'te HTML elementine erişim

const gorevInput=document.getElementById("gorevInput");
const ekleBtn=document.getElementById("ekleBtn");
const gosterBtn=document.getElementById("gosterBtn");
const silBtn=document.getElementById("silBtn");
const gorevDelete=document.getElementById("gorevDelete");
const gorevListesi=document.getElementById("gorevListesi");
//closure fonksiyonu, id oluşturma işlemi için
const idOlustur=(()=>{
    let id=0; 
    return () => {
        id++; 
        return id; 
    };
})();

//listeme fonksiyonları
function gorevleriListele() {
    gorevListesi.innerHTML=""; //HTML içeriğini temizle

    //görev kontrolü(if-else)(arrow function)(forEach dizide gezmek için)
    if(gorevler.length === 0) {
        const li= document.createElement("li");
        li.textContent="Görev listesi boş.";
        gorevListesi.appendChild(li);
        return;
    }
    gorevler.forEach((gorev)=>{
        const li = document.createElement("li");
        li.textContent = `(${gorev.id}) ${gorev.text}`; // id ve metni birlikte yaz
        gorevListesi.appendChild(li);
    })

}
//trim baş ve sondaki boşlukları siler
//arrow function,DOM erişimi , koşul , diziye eleman ekleme
ekleBtn.addEventListener("click", () => {
    const yeniGorevMetni = gorevInput.value.trim();
    if (yeniGorevMetni !== "") {
        const yeniGorev={
            id: idOlustur(), //id oluşturma fonksiyonundan id al
            text: yeniGorevMetni //görev metni
        }
        gorevler.push(yeniGorev);
        gorevInput.value = ""; //input alanını temizle  
        gorevleriListele(); //görevleri listele
        alert("Görev eklendi: " + yeniGorevMetni);   
    }
    else{
        alert("Lütfen bir görev girin.");
    }
}); 

//Görevleri silme
//arrow function,DOM,const,,koşul ,fonksiyon çağrısı
// filter metodu dizideki elemanlaarı kotrol eder koşlu sağlayanı diziye ekle 
silBtn.addEventListener("click", () => {
    const silinecekGirdi = gorevDelete.value.trim();
    if (silinecekGirdi !== "") {
        const oncekiUzunluk = gorevler.length;  // Türkçe karakter yok!
        
        gorevler = gorevler.filter((gorev) => 
            gorev.text !== silinecekGirdi && gorev.id !== Number(silinecekGirdi)
        );

        if (gorevler.length < oncekiUzunluk) {
            gorevDelete.value = "";
            gorevleriListele();
            alert("Görev silindi: " + silinecekGirdi);
        } else {
            alert("Görev bulunamadı: " + silinecekGirdi);
        }
    } else {
        alert("Lütfen silinecek bir görev girin.");
    }
});
//Görevleri gösterme
gosterBtn.addEventListener("click", () => gorevleriListele())