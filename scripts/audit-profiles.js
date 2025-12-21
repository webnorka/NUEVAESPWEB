const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envFile = fs.readFileSync('.env.local', 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) env[key.trim()] = value.trim();
});

const supabase = createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function inspectProfiles() {
    console.log("--- PROFILES AUDIT ---");
    const { data: profiles, error } = await supabase.from('profiles').select('*');

    if (error) {
        console.error("Fetch Error:", error);
        return;
    }

    console.log(`Total profiles found: ${profiles.length}`);
    profiles.forEach((p, i) => {
        console.log(`[${i}] ID: ${p.id} | Role: ${p.role} | Name: ${p.full_name} | Username: ${p.username}`);
    });

    // Check for any obvious mismatches
    const roles = [...new Set(profiles.map(p => p.role))];
    console.log("Roles present in DB:", roles);
}

inspectProfiles();
