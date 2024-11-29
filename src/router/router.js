import { createRouter, createWebHistory } from "vue-router";
import AppLogin from "../components/AppLogin.vue";
import AppUsers from "../components/AppUsers.vue";
import CommercialSecret from "../components/CommercialSecret.vue";
import EmploymentContract from "../components/EmploymentContract.vue";
import UploadDoc from "../components/UploadDoc.vue";
import ScanPassport from "../components/ScanPassport.vue";
import ScanMedcine from "../components/ScanMedcine.vue";
import AppMain from "../components/AppMain.vue";
import PersonalData from "../components/PersonalData.vue";
import CreateNews from "../components/CreateNews.vue";
import AppNews from "../components/AppNews.vue";
import CreateTask from "../components/CreateTask.vue";
import AppAcademy from "../components/AppAcademy.vue";
import CreateBlock from "../components/CreateBlock.vue";
import CreateLesson from "../components/CreateLesson.vue";
import AppLesson from "../components/AppLesson.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: AppLogin,
      name: "login",
    },
    {
      path: "/users",
      component: AppUsers,
      name: "users",
    },
    {
      path: "/main",
      component: AppMain,
      name: "main",
    },
    {
      path: "/commercial_secret",
      component: CommercialSecret,
      name: "commercialSecret",
    },
    {
      path: "/employment_contract",
      component: EmploymentContract,
      name: "employmentContract",
    },
    {
      path: "/upload/doc",
      component: UploadDoc,
      name: "upload_doc",
    },
    {
      path: "/upload/passport",
      component: ScanPassport,
      name: "scan_passport",
    },
    {
      path: "/upload/medcine",
      component: ScanMedcine,
      name: "scan_medcine",
    },
    {
      path: "/personal_data",
      component: PersonalData,
      name: "personal_data",
    },
    {
      path: "/news/create",
      component: CreateNews,
      name: "create_news",
    },
    {
      path: "/news",
      component: AppNews,
      name: "news",
    },
    {
      path: "/tasks/create",
      component: CreateTask,
      name: "create_task",
    },
    {
      path: "/academy",
      component: AppAcademy,
      name: "academy",
    },
    {
      path: "/academy/block/create",
      component: CreateBlock,
      name: "create_block",
    },
    {
      path: "/academy/lesson/create",
      component: CreateLesson,
      name: "create_lesson",
    },
    {
      path: "/academy/lesson",
      component: AppLesson,
      name: "lesson",
    },
  ],
});

export default router;
