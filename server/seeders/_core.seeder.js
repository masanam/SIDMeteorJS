import VendorsSeeder from './vendor.seeder';
import UserSeeder from './user.seeder';
import TeamSeeder from './team.seeder';
import VisitorSeeder from './visitor.seeder';
import RfidSeeder from './visitor.seeder';
import AttendanceSeeder from './attendance.seeder';
import ContractedEmployeeSeeder from './contracted-employee.seeder';
import ProjectTaskSeeder from './projects-and-tasks.seeder';
import HazardSeeder from './hazard.seeder';
import AuditSeeder from './audit.seeder';
import InvestigationSeeder from './investigation.seeder';
import AssetSeeder from './asset.seeder';
import CommisioningSeeder from './commisioning.seeder';
import LicenseSeeder from './license.seeder';
import ViolationSeeder from './violation.seeder';


Meteor.startup(() => {
  UserSeeder();
  TeamSeeder();
  EmployeeSeeder();
  VendorsSeeder();
  ContractedEmployeeSeeder();
  VisitorSeeder();
  RfidSeeder();
  ApprovalSeeder();
  AttendanceSeeder();
  ProjectTaskSeeder();
  HazardSeeder();
  AuditSeeder();
  InvestigationSeeder();
  AssetSeeder();
  CommisioningSeeder();
  LicenseSeeder();
  ViolationSeeder();
});
