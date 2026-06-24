import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import connectDb from "../config/db.js";
import Roadmap from "../models/roadmap.model.js";
import roadmapsSeedData from "../data/roadmaps.seed.js";
import dns from "dns";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = join(__dirname, '..', '.env');

dotenv.config({ path: envPath });

dns.setServers(["8.8.8.8"]);

const seedRoadmaps = async () => {
    try {
        await connectDb();

        for (const roadmapData of roadmapsSeedData) {
            const existingRoadmap = await Roadmap.findOne({ title: roadmapData.title });

            if (existingRoadmap) {
                console.log(`Skipped (already exists): ${roadmapData.title}`);
                continue;
            }

            await Roadmap.create(roadmapData);
            console.log(`Seeded: ${roadmapData.title}`);
        }

        console.log("Roadmap seeding completed.");
        process.exit(0);
    } catch (error) {
        console.error("Roadmap seeding failed:", error);
        process.exit(1);
    }
};

seedRoadmaps();
