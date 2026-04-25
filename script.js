/**
 * CONFIGURATION SUPABASE
 * Remplace les valeurs ci-dessous par celles de ton tableau Supabase
 */
const SUPABASE_URL = 'https://TON_ID_PROJET.supabase.co'; 
const SUPABASE_ANON_KEY = 'TON_TOKEN_ANON_ICI';

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function chercherEleve() {
    const matricule = document.getElementById('matriculeInput').value.trim();
    const resultArea = document.getElementById('resultArea');
    const loader = document.getElementById('loader');

    if (!matricule) {
        alert("Veuillez saisir un matricule.");
        return;
    }

    // Affichage du chargement
    loader.style.display = "block";
    resultArea.style.display = "none";

    try {
        // Requête à Supabase
        const { data, error } = await _supabase
            .from('eleves') // Nom exact de ta table
            .select('*')
            .eq('matricule', matricule)
            .single();

        loader.style.display = "none";

        if (error || !data) {
            resultArea.innerHTML = `<p style="color:red;">❌ Matricule introuvable. Veuillez contacter le surveillant général.</p>`;
            resultArea.style.display = "block";
        } else {
            // Affichage des informations de l'élève
            resultArea.innerHTML = `
                <h3 style="color: var(--bleu); margin-bottom:10px;">${data.nom_complet}</h3>
                <p><strong>Classe :</strong> ${data.classe}</p>
                <hr style="margin:10px 0; border:0; border-top:1px solid #ddd;">
                <p style="font-size: 1.2rem;"><strong>📍 Salle :</strong> ${data.salle}</p>
                <p style="font-size: 1.2rem;"><strong>🪑 Table n° :</strong> ${data.num_table}</p>
            `;
            resultArea.style.display = "block";
        }
    } catch (err) {
        loader.style.display = "none";
        alert("Erreur de connexion à la base de données.");
    }
}
