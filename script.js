async function lookup() {
  const ip = document.getElementById("ipInput").value;
  const res = await fetch(`http://localhost:3000/api/lookup?ip=${ip}`);
  const data = await res.json();

  const results = document.getElementById("results");
  results.innerHTML = '';

  if (data.error) {
    results.innerHTML = `<p class="text-red-500">Error: ${data.error}</p>`;
    return;
  }

  results.innerHTML = `
    <h2 class="text-xl font-bold mb-2">WHOIS Info</h2>
    <pre class="bg-gray-700 p-2 rounded">${JSON.stringify(data.whois, null, 2)}</pre>
    <h2 class="text-xl font-bold mt-4 mb-2">Minecraft Server Info</h2>
    <pre class="bg-gray-700 p-2 rounded">${JSON.stringify(data.minecraft, null, 2)}</pre>
  `;
}
