const scriptURL = 'https://script.google.com/macros/s/AKfycbwiQ99ScWJwvUpon9QNU5AsnCYg2R4v5IVaCCHsEkFaJfzcuB9Y7Pune-50ziwC/exec';
document.getElementById("registration").addEventListener("keydown", function (e) {
    if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
        e.preventDefault(); // Stop Enter from triggering the first button
    }
});


let count = 0;

window.onload = () => {
    if (localStorage.getItem("submitted") === "true") {
        document.querySelectorAll("input, button").forEach(el => el.disabled = true);
        document.body.innerHTML += `<p style="color: white; font-size: 20px;">🎉 You already submitted. Thanks for being part of Tech for Girls!</p>`;
    }
};

document.getElementById("btn").addEventListener("click", function(event) {
    event.preventDefault();
    if (count < 5) {
        const msg = encodeURIComponent("Hey Buddy, Join Tech For Girls Community!");
        window.open(`https://wa.me/?text=${msg}`, "_blank");
        count++;
        document.getElementById("clickcount").innerText = `Click Count: ${count}/5`;
    }
    if (count === 5) {
        alert("✅ Sharing complete. Please continue.");
    }
});

document.getElementById("submitBtn").addEventListener("click", function(e) {
    e.preventDefault();

    if (count < 5) {
        alert("Please complete WhatsApp sharing (5/5) before submitting.");
        return;
    }

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const college = document.getElementById("college").value.trim();
    const file = document.getElementById("screenshot").files[0];

    if (!name || !phone || !email || !college || !file) {
        alert("❌ Please fill all fields and upload the screenshot.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function () {
        const formData = {
            name: name,
            phone: phone,
            email: email,
            college: college,
            screenshot: reader.result
        };

        fetch(scriptURL, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.text())
        .then(responseText => {
            alert("🎉 Submission successful!");
            document.querySelectorAll("input, button").forEach(el => el.disabled = true);
            localStorage.setItem("submitted", "true");
            document.body.innerHTML += `<p style="color: white; font-size: 20px;">🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!</p>`;
        })
        .catch(error => {
            console.error("Error:", error);
            alert("❌ Submission failed. Try again.");
        });
    };

    reader.readAsDataURL(file);
});


