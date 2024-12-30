import { db } from "@util/db";
import * as schema from "./schema/schema";

// await db.insert(schema.users).values([
//   {
//     name: "Wesley Burke",
//     email: "wesley@burkedesigns.biz",
//     phone: "5712327661",
//     type: "admin",
//     group: 'IT',
//     job_title: 'Full Stack Developer'
//   },
// ]);

// await db.insert(schema.pages).values([
//   {
//     uid: 1,
//     type:'markdown-news-page',
//     slug: 'article1',
//     title: 'Article 1',
//     author: "Wesley Burke",
//     description: 'Random description of page',
//     content: '# Hi, this is a test page',
//   },
//   {
//     uid: 1,
//     type:'markdown-news-page',
//     slug: 'article2',
//     title: 'Article 2',
//     author: "Wesley Burke",
//     description: 'Random description of page',
//     content: '# Hi, this is a test page 2',
//   },
// ]);

// await db.insert(schema.forms).values([
//   {
//     uid: 1,
//     title: 'Student Insurance Waiver',
//     description: 'Allows students to waive UoNA provided insurance as long as they provide proof of existing insurance.',
//     status: 'published',
//     images: [{
//       type: 'url',
//       href: '/images/health-insurance.avif',
//     }],
//     fields: [{
//       name: 'name',
//       label: 'Full Name',
//       type: 'text',
//     },{
//       name: 'name',
//       label: 'Full Name',
//       type: 'text',
//     }],
//   },
// ]);

// console.log(`Seeding complete.`);