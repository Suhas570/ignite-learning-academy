import pg from 'pg';
import dotenv from 'dotenv';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URI });

const syllabusTopics = [
  'Self-Awareness & Personal Development',
  'Interpersonal & Relationship Skills',
  'Emotional Intelligence',
  'Time Management & Organisation',
  'Financial Literacy',
  'Leadership & Team Building',
  'Digital & Social Awareness',
  'Values, Ethics & Social Responsibility',
];

async function updateDb() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // 1. Update NTT duration
    const nttRes = await client.query(
      'UPDATE courses SET duration = $1, updated_at = NOW() WHERE slug = $2 RETURNING id, slug, duration',
      ['6 Months / 1 Year', 'nursery-teachers-training']
    );
    console.log('Updated NTT duration:', nttRes.rows);

    // 2. Find Juniors & Seniors IDs
    const courseRes = await client.query(
      "SELECT id, slug FROM courses WHERE slug IN ('life-skills-for-juniors', 'life-skills-for-seniors')"
    );
    console.log('Found courses:', courseRes.rows);

    for (const c of courseRes.rows) {
      await client.query('DELETE FROM courses_syllabus WHERE _parent_id = $1', [c.id]);

      for (let i = 0; i < syllabusTopics.length; i++) {
        const rowId = crypto.randomBytes(12).toString('hex');
        await client.query(
          'INSERT INTO courses_syllabus (_order, _parent_id, id, module) VALUES ($1, $2, $3, $4)',
          [i + 1, c.id, rowId, syllabusTopics[i]]
        );
      }
      console.log(`Inserted ${syllabusTopics.length} syllabus topics for ${c.slug} (ID: ${c.id})`);
    }

    await client.query('COMMIT');
    console.log('Database update committed successfully!');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Failed to update DB:', err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

updateDb();
