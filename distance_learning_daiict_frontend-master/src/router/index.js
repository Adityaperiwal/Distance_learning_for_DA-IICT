import Vue from 'vue'
import Router from 'vue-router'
import adminHome from '@/components/admin/AdminHome'
import adminviewFaculty from '@/components/admin/Faculty/viewFaculty'
import adminadd from '@/components/admin/Faculty/add'
import adminupdate from '@/components/admin/Faculty/update'
import adminview from '@/components/admin/Faculty/view'
import adminstudentview from '@/components/admin/student/sview/'
import admincreate from '@/components/admin/course/create'
import adminremoveCourse from '@/components/admin/course/remove'
import adminUpdateCourse from '@/components/admin/course/updateCourse'
import AdminListComplains from '@/components/admin/complain/listcomplains'
import AdminViewComplain from '@/components/admin/complain/viewComplain'
import AdminListInquiries from '@/components/admin/inquiry/showInquiries'
import AdminviewInquiry from '@/components/admin/inquiry/viewInquiry'
import AdminLogin from '@/components/admin/login'
import Adminforgotpwd from '@/components/admin/adminforgotpwd'
import Adminpwdreset from '@/components/admin/adminpwdreset'
import AddAdmin from '@/components/admin/addNewAdmin'

import StudentSignUp from '@/components/student/StudentSignup'
import StudentLogin from '@/components/student/StudentLogin'
import EditProfile from '@/components/student/profile'
import StudentFacultyCourse from '@/components/student/facultycourse/'
import Studentsubtopic from '@/components/student/subtopic'
import Studentstudy from '@/components/student/study'
import Studforgot from '@/components/student/studforgot'
import Studreset from '@/components/student/student_reset'
import StudComplain from '@/components/student/complain'
import studentHome from '@/components/student/home'
import StudInquiry from '@/components/student/inquiry'
import Studfeedback from '@/components/student/studentfeedback'
import MyCourses from '@/components/student/MyCourse'
import Exam from '@/components/student/exam'

import tasignup from '@/components/TA/signup'
import talogin from '@/components/TA/login'
import tatile from '@/components/TA/tile'
import tareset from '@/components/TA/reset'
import taforgotpassword from '@/components/TA/for'
import taeditprofile from '@/components/TA/profile/editprofile'
import taindex from '@/components/TA/index'
import tadiscussion from '@/components/TA/discussion/discussion'
import taviewdiscussion from '@/components/TA/discussion/viewdiscussion'
import taviewprofile from '@/components/TA/profile/viewprofile'
import taevaluation from '@/components/TA/evaluation/evaluation'
import viewTAevaluationstd from '@/components/TA/evaluation/viewevaluationstd'
import viewTAevaluation from '@/components/TA/evaluation/viewevaluation'
import evaluatestudent from '@/components/TA/evaluation/evaluatestudent'

import viewfacultyprofile from '@/components/Faculty/facultyprofile/viewprofile'
import editprofile from '@/components/Faculty/facultyprofile/editprofile'
import createcourse from '@/components/Faculty/course/createcourse'
import editcourse from '@/components/Faculty/course/editcourse'
import facindex from '@/components/Faculty/index'
import viewevaluationstd from '@/components/Faculty/evaluation/viewevaluationstd'
import viewevaluationstudents from '@/components/Faculty/evaluation/viewevaluationstudents'
import viewdiscussion from '@/components/Faculty/discussion/viewdiscussion'
import facultyviewcourse from '@/components/Faculty/course/view'
import facultyevaluation from '@/components/Faculty/evaluation/evaluation'
import facultydiscussion from '@/components/Faculty/discussion/discussion'
import viewevaluation from '@/components/Faculty/evaluation/viewevaluation'
import createtest from '@/components/Faculty/test/createtest'
import viewtest from '@/components/Faculty/test/viewtest'
import testview from '@/components/Faculty/test/testview'
import edittest from '@/components/Faculty/test/edittest'
import FacultyLogin from '@/components/Faculty/login'
import testtable from '@/components/Faculty/test/testtable'
// import StudHome from '@/components/student/home'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/admin/',
      name: 'AdminLogin',
      component: AdminLogin
    },
    {
      path: '/admin/Faculty/viewFaculty',
      name: 'adminviewFaculty',
      component: adminviewFaculty
    },
    {
      path: '/admin/faculty/add',
      name: 'adminadd',
      component: adminadd
    },
    {
      path: '/admin/faculty/update/:id',
      name: 'adminupdate',
      component: adminupdate
    },
    {
      path: '/admin/faculty/view/:id',
      name: 'adminview',
      component: adminview
    },
    {
      path: '/admin/student/sview',
      name: 'adminstudentview',
      component: adminstudentview
    },
    {
      path: '/admin/course/create',
      name: 'admincreate',
      component: admincreate
    },
    {
      path: '/admin/course/view/',
      name: 'adminremoveCourse',
      component: adminremoveCourse
    },
    {
      path: '/admin/course/updateCourse/:id',
      name: 'adminUpdateCourse',
      component: adminUpdateCourse
    },
    {
      path: '/admin/complain/listcomplains',
      name: 'AdminListComplains',
      component: AdminListComplains
    },
    {
      path: '/admin/complain/viewComplain/:id',
      name: 'AdminViewComplain',
      component: AdminViewComplain
    },
    {
      path: '/admin/inquiry/showInquiries',
      name: 'AdminListInquiries',
      component: AdminListInquiries
    },
    {
      path: '/admin/inquiry/viewInquiry/:id',
      name: 'AdminviewInquiry',
      component: AdminviewInquiry
    },
    {
      path: '/admin/AdminHome',
      name: 'adminHome',
      component: adminHome
    },
    {
      path: '/admin/adminforgotpwd',
      name: 'Adminforgotpwd',
      component: Adminforgotpwd
    },
    {
      path: '/admin/adminpwdreset',
      name: 'Adminpwdreset',
      component: Adminpwdreset
    },
    {
      path: '/admin/addNewAdmin',
      name: 'AddAdmin',
      component: AddAdmin
    },
    {
      path: '/student/signup',
      name: 'StudnetSignUp',
      component: StudentSignUp
    },
    {
      path: '/student/login',
      name: 'StudnetLogin',
      component: StudentLogin
    },
    {
      path: '/student/EditProfile/:id',
      name: 'EditProfile',
      component: EditProfile
    },
    {
      path: '/student/facultycourse/:id',
      name: 'StudentFacultyCourse',
      component: StudentFacultyCourse
    },
    {
      path: '/student/subtopic/:id',
      name: 'Studentsubtopic',
      component: Studentsubtopic
    },
    {
      path: '/student/studytopic/:id',
      name: 'Studentstudy',
      component: Studentstudy
    },
    {
      path: '/student/forgotpassword',
      name: 'Studforgot',
      component: Studforgot
    },
    {
      path: '/student/complains/:id',
      name: 'StudComplain',
      component: StudComplain
    },
    {
      path: '/student/reset',
      name: 'Studreset',
      component: Studreset
    },
    {
      path: '/',
      name: 'studentHome',
      component: studentHome
    },
    {
      path: '/student/inquiry',
      name: 'StudInquiry',
      component: StudInquiry
    },
    {
      path: '/student/feedback/:id',
      name: 'Studfeedback',
      component: Studfeedback
    },
    {
      path: '/student/Mycourse',
      name: 'MyCourses',
      component: MyCourses
    },
    {
      path: '/student/exam/:id',
      name: 'Exam',
      component: Exam
    },
    {
      path: '/TA/tile',
      name: 'tatile',
      component: tatile
    },
    {
      path: '/TA/evaluation/evaluatestudent',
      name: 'evaluatestudent',
      component: evaluatestudent
    },
    {
      path: '/TA/evaluation/viewevaluation',
      name: 'viewTAevaluation',
      component: viewTAevaluation
    },
    {
      path: '/TA/evaluation/evaluation',
      name: 'taevaluation',
      component: taevaluation
    },
    {
      path: '/TA/evaluation/viewevaluationstd',
      name: 'viewTAevaluationstd',
      component: viewTAevaluationstd
    },
    {
      path: '/TA/signup',
      name: 'tasignup',
      component: tasignup
    },
    {
      path: '/TA/reset',
      name: 'tareset',
      component: tareset
    },
    {
      path: '/TA/profile/viewprofile',
      name: 'taviewprofile',
      component: taviewprofile
    },
    {
      path: '/TA/discussion/viewdiscussion',
      name: 'taviewdiscussion',
      component: taviewdiscussion
    },
    {
      path: '/TA/for',
      name: 'taforgot',
      component: taforgotpassword
    },
    {
      path: '/TA/index',
      name: 'taindex',
      component: taindex
    },
    {
      path: '/TA/discussion/discussion',
      name: 'tadiscussion',
      component: tadiscussion
    },
    {
      path: '/TA/login',
      name: 'talogin',
      component: talogin
    },
    {
      path: '/TA/profile/editprofile',
      name: 'taeditprofile',
      component: taeditprofile
    },
    {
      path: '/Faculty/viewprofile',
      name: 'viewprofileFaculty',
      component: viewfacultyprofile
    },
    {
      path: '/Faculty/editprofile/:id',
      name: 'editprofile',
      component: editprofile
    },
    {
      path: '/Faculty/course/view/',
      name: 'viewcourse',
      component: facultyviewcourse
    },
    {
      path: '/Faculty/index',
      name: 'facindex',
      component: facindex
    },
    {
      path: '/Faculty/course/createcourse',
      name: 'createcourse',
      component: createcourse
    },
    {
      path: '/Faculty/course/editcourse/:id',
      name: 'editcourse',
      component: editcourse
    },
    {
      path: '/Faculty/evaluation/student/view/:student_id/:subtopic_id',
      name: 'viewevaluationstd',
      component: viewevaluationstd
    },
    {
      path: '/Faculty/evaluation/student/:id',
      name: 'viewevaluationstudents',
      component: viewevaluationstudents
    },
    {
      path: '/Faculty/evaluation/:id',
      name: 'viewevaluation',
      component: viewevaluation
    },
    {
      path: '/Faculty/discussion/:id',
      name: 'viewdiscussion',
      component: viewdiscussion
    },
    {
      path: '/Faculty/discussion',
      name: 'facultydiscussion',
      component: facultydiscussion
    },
    {
      path: '/Faculty/evaluation',
      name: 'facultyevaluation',
      component: facultyevaluation
    },
    {
      path: '/Faculty/test/:id',
      name: 'viewtest',
      component: viewtest
    },
    {
      path: '/Faculty/test/edit/:id',
      name: 'edittest',
      component: edittest
    },
    {
      path: '/Faculty/test/create/:id',
      name: 'createtest',
      component: createtest
    },
    {
      path: '/Faculty/test/view',
      name: 'testview',
      component: testview
    },
    {
      path: '/Faculty/test/table/abc',
      name: 'testtable',
      component: testtable
    },
    {
      path: '/Faculty/',
      name: 'FacultyLogin',
      component: FacultyLogin
    },
    {
      path: '/student/complains/:id',
      name: 'StudComplain',
      component: StudComplain
    },
    {
      path: '/student/reset',
      name: 'Studreset',
      component: Studreset
    },
    {
      path: '/',
      name: 'studentHome',
      component: studentHome
    },
    {
      path: '/student/inquiry',
      name: 'StudInquiry',
      component: StudInquiry
    },
    {
      path: '/student/feedback/:id',
      name: 'Studfeedback',
      component: Studfeedback
    },
    {
      path: '/student/Mycourse',
      name: 'MyCourses',
      component: MyCourses
    },
    {
      path: '/student/exam',
      name: 'Exam',
      component: Exam
    }
  ],
  mode: 'history'
})
