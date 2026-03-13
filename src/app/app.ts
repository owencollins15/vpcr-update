import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Communication } from './communication';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs';

//Export allows me to call interfaces , const in position-users.ts
export interface Position {
  id: number;
  name: string;
  divisionId: number;
  supervisorId: number;
}
export const POSITION: Position[] = [
  { id: 1, name: 'position 1', divisionId: 0, supervisorId: 0 },
  { id: 2, name: 'position 2', divisionId: 0, supervisorId: 0 },
  { id: 3, name: 'position 3', divisionId: 0, supervisorId: 0 },
  { id: 4, name: 'position 4', divisionId: 0, supervisorId: 0 },
  { id: 5, name: 'position 5', divisionId: 0, supervisorId: 0 },
  { id: 6, name: 'position 6', divisionId: 0, supervisorId: 0 },
  { id: 7, name: 'position 7', divisionId: 0, supervisorId: 0 },
  { id: 8, name: 'position 8', divisionId: 0, supervisorId: 0 },
  { id: 9, name: 'position 9', divisionId: 0, supervisorId: 0 },
  { id: 10, name: 'position 10', divisionId: 0, supervisorId: 0 },
];
export interface Division {
  id: number;
  name: string;
}

export const DIVISIONS: Division[] = [
  { id: 1, name: 'SOAs' },
  { id: 2, name: 'SDMC' },
  { id: 3, name: 'Intake' },
  { id: 4, name: '3BDR' },
  { id: 5, name: 'SOAR' },
  { id: 6, name: 'Field' },
  { id: 7, name: 'Death' },
  { id: 8, name: 'OGC(LDU)' },
  { id: 9, name: 'Employee Discipline' },
  { id: 10, name: 'DeNovo' },
  { id: 11, name: 'ALU' },
  { id: 12, name: 'Prosecutions' },
  { id: 13, name: 'AHU' },
  { id: 14, name: 'OSP' },
  { id: 15, name: 'CBC' },
  { id: 16, name: 'IFSU' },
  { id: 17, name: 'Forensics' },
  { id: 18, name: 'PQI' },
  { id: 19, name: 'Records Access' },
];

export interface Supervisor {
  id: number;
  name: string;
}

export const SUPERVISORS: Supervisor[] = [
  { id: 1, name: 'supervisor 1' },
  { id: 2, name: 'supervisor 2' },
  { id: 3, name: 'supervisor 3' },
  { id: 4, name: 'supervisor 4' },
  { id: 5, name: 'supervisor 5' },
];

export interface Queues {
  id: number;
  name: string;
  divisionId: number;
}

export const QUEUES: Queues[] = [
  { id: 1, name: 'NYJC_CAP_ACTIVITY_SOA_LED_rollDown_ACCESS', divisionId: 1 },
  { id: 2, name: 'QUEUE_DOH', divisionId: 1 },
  { id: 3, name: 'QUEUE_OASAS', divisionId: 1 },
  { id: 4, name: 'QUEUE_OCFS', divisionId: 1 },
  { id: 5, name: 'QUEUE_OMH', divisionId: 1 },
  { id: 6, name: 'QUEUE_OPWDD', divisionId: 1 },
  { id: 7, name: 'QUEUE_SED', divisionId: 1 },
  { id: 8, name: 'QUEUE_OCFS_CAP', divisionId: 1 },
  { id: 9, name: 'SDMC', divisionId: 2 },
  { id: 10, name: 'SDMC_CONFCALL_QUEUE', divisionId: 2 },
  { id: 11, name: 'SDMC_JC_PEND_ASSIGNMENT_QUEUE', divisionId: 2 },
  { id: 12, name: 'SDMC_QUEUE_CAPITAL_TACONIC_REG', divisionId: 2 },
  { id: 13, name: 'SDMC_QUEUE_CENTRAL_REG', divisionId: 2 },
  { id: 14, name: 'SDMC_QUEUE_FINGER_LAKES_REG', divisionId: 2 },
  { id: 15, name: 'SDMC_QUEUE_LONG_ISLAND_REG', divisionId: 2 },
  { id: 16, name: 'SDMC_QUEUE_NURSE', divisionId: 2 },
  { id: 17, name: 'SDMC_QUEUE_REVIEW', divisionId: 2 },
  { id: 18, name: 'SDMC_QUEUE_ROCKLAND_REG', divisionId: 2 },
  { id: 19, name: 'SDMC_QUEUE_SUNMOUNT_REG', divisionId: 2 },
  { id: 20, name: 'SDMC_QUEUE_WESTERN_REG', divisionId: 2 },
  { id: 21, name: 'SDMC_QUEUE_VOL', divisionId: 2 },
  { id: 22, name: 'SDMC_CONFCALL_QUEUE', divisionId: 2 },
  { id: 23, name: 'SDMC_JC_PEND_ASSIGNMENT_QUEUE', divisionId: 2 },
  { id: 24, name: 'NYJC_A&N_DEATH_CASE_DRILLDOWN_ACCESS', divisionId: 3 },
  { id: 25, name: 'QUEUE_INCIDENT_REVIEW', divisionId: 3 },
  { id: 26, name: 'QUEUE_INCIDENT_REVIEW_XML', divisionId: 3 },
  { id: 27, name: 'QUEUE_INTAKE_DEATH', divisionId: 3 },
  { id: 28, name: 'QUEUE_INTAKE_QA', divisionId: 3 },
  { id: 29, name: 'QUEUE_IN_SUP', divisionId: 3 },
  { id: 30, name: 'QUEUE_MERGE_REQUEST', divisionId: 3 },
  { id: 31, name: 'NYJC_A&N_DEATH_CASE_DRILLDOWN_ACCESS', divisionId: 4 },
  { id: 32, name: 'QUEUE_3BDR', divisionId: 4 },
  { id: 33, name: 'QUEUE_IN_TRG', divisionId: 4 },
  { id: 34, name: 'QUEUE_3BDR_SUP', divisionId: 4 },
  { id: 35, name: 'QUEUE_CASE_REVIEW', divisionId: 4 },
  { id: 36, name: 'QUEUE_INITIAL_JCASSIGNMENT', divisionId: 4 },
  { id: 37, name: 'QUEUE_TRIAGE', divisionId: 4 },
  { id: 38, name: 'QUEUE_TRIAGE_SUP', divisionId: 4 },
  { id: 39, name: 'SM_CASE_SUBSTATUS_INV_ASMT', divisionId: 4 },
  { id: 40, name: 'SM_CASE_SUBSTATUS_PR_IC', divisionId: 4 },
  { id: 41, name: 'QUEUE_MERGE_REQUEST', divisionId: 4 },
  { id: 42, name: 'QUEUE_TRIAGE_SUP', divisionId: 5 },
  { id: 43, name: 'QUEUE_TRIAGE', divisionId: 5 },
  { id: 44, name: 'QUEUE_OSP', divisionId: 5 },
  { id: 45, name: 'QUEUE_IN_TRG', divisionId: 5 },
  { id: 46, name: 'QUEUE_CASE_REVIEW', divisionId: 5 },
  { id: 47, name: 'NYJC_ENABLE_CASE_TRANSFER_ACCESS', divisionId: 5 },
  { id: 48, name: 'SM_CASE_SUBSTATUS_PR_IC', divisionId: 5 },
  { id: 49, name: 'SM_CASE_SUBSTATUS_INV_ASMT', divisionId: 5 },
  { id: 50, name: 'R1_CRIMINAL_QUEUE', divisionId: 6 },
  { id: 51, name: 'R1_DELMAR_QUEUE', divisionId: 6 },
  { id: 52, name: 'R1_GLENS_FALLS_QUEUE', divisionId: 6 },
  { id: 53, name: 'R2_BINGHAMTON_QUEUE', divisionId: 6 },
  { id: 54, name: 'R2_CRIMINAL_QUEUE', divisionId: 6 },
  { id: 55, name: 'R2_SYRACUSE_QUEUE', divisionId: 6 },
  { id: 56, name: 'R2_UTICA_QUEUE', divisionId: 6 },
  { id: 57, name: 'R3_BUFFALO_QUEUE', divisionId: 6 },
  { id: 58, name: 'R3_CRIMINAL_QUEUE', divisionId: 6 },
  { id: 59, name: 'R3_ROCHESTER_QUEUE', divisionId: 6 },
  { id: 60, name: 'R4_PLAINVIEW_QUEUE', divisionId: 6 },
  { id: 61, name: 'R5_CRIMINAL_QUEUE', divisionId: 6 },
  { id: 62, name: 'R5_POUGHKEEPSIE_QUEUE', divisionId: 6 },
  { id: 63, name: 'R5_ROCKLAND_QUEUE', divisionId: 6 },
  { id: 64, name: 'R5_WESTCHESTER_QUEUE', divisionId: 6 },
  { id: 65, name: 'R6_BRONX_QUEUE', divisionId: 6 },
  { id: 66, name: 'R6_BROOKLYN_QUEUE', divisionId: 6 },
  { id: 67, name: 'CPR_EDIT_ACCESS', divisionId: 6 },
  { id: 68, name: 'NYJC_A&N_DEATH_CASE_DRILLDOWN_ACCESS', divisionId: 6 },
  { id: 69, name: 'NYJC_ADJ_CASE_DRILLDOWN_ACCESS', divisionId: 6 },
  { id: 70, name: 'NYJC_ENABLE_CASE_TRANSFER_ACCESS', divisionId: 6 },
  { id: 71, name: 'NYJC_PROS_CASE_DRILLDOWN_ACCESS', divisionId: 6 },
  { id: 72, name: 'SM_CASE_SUBSTATUS_PR_IC', divisionId: 6 },
  { id: 73, name: 'SM_CASE_SUBSTATUS_INV_ASMT', divisionId: 6 },
  { id: 74, name: 'QUEUE_MERGE_REQUEST', divisionId: 6 },
  { id: 75, name: 'QUEUE_INV_CONSULT', divisionId: 6 },
  { id: 76, name: 'NYJC_A&N_DEATH_CASE_DRILLDOWN_ACCESS', divisionId: 7 },
  { id: 77, name: 'NYJC_ADJ_CASE_DRILLDOWN_ACCESS', divisionId: 7 },
  { id: 78, name: 'NYJC_ENABLE_CASE_TRANSFER_ACCESS', divisionId: 7 },
  { id: 79, name: 'NYJC_PROS_CASE_DRILLDOWN_ACCESS', divisionId: 7 },
  { id: 80, name: 'QUEUE_DEATH', divisionId: 7 },
  { id: 81, name: 'NYJC_A&N_DEATH_CASE_DRILLDOWN_ACCESS', divisionId: 8 },
  { id: 82, name: 'QUEUE_OGC_CLOSE', divisionId: 8 },
  { id: 83, name: 'QUEUE_OGC_CONSULT', divisionId: 8 },
  { id: 84, name: 'QUEUE_OGC_PROC', divisionId: 8 },
  { id: 85, name: 'QUEUE_OGC_REVIEW', divisionId: 8 },
  { id: 86, name: 'NYJC_A&N_DEATH_CASE_DRILLDOWN_ACCESS', divisionId: 9 },
  { id: 87, name: 'NYJC_ADJ_CASE_DRILLDOWN_ACCESS', divisionId: 9 },
  { id: 88, name: 'NYJC_PROS_CASE_DRILLDOWN_ACCESS', divisionId: 9 },
  { id: 89, name: 'NYJC_A&N_DEATH_CASE_DRILLDOWN_ACCESS', divisionId: 10 },
  { id: 90, name: 'NYJC_ADJ_CASE_DRILLDOWN_ACCESS', divisionId: 10 },
  { id: 91, name: 'NYJC_INITIATE_ADJ_PROS_ACCESS', divisionId: 10 },
  { id: 92, name: 'NYJC_PROS_CASE_DRILLDOWN_ACCESS', divisionId: 10 },
  { id: 93, name: 'QUEUE_DENOVO_REVIEW', divisionId: 10 },
  { id: 94, name: 'QUEUE_SPIG', divisionId: 10 },
  { id: 95, name: 'NYJC_A&N_DEATH_CASE_DRILLDOWN_ACCESS', divisionId: 11 },
  { id: 96, name: 'NYJC_ADJ_CASE_DRILLDOWN_ACCESS', divisionId: 11 },
  { id: 97, name: 'NYJC_PROS_CASE_DRILLDOWN_ACCESS', divisionId: 11 },
  { id: 98, name: 'QUEUE_ADJUDICATION', divisionId: 11 },
  { id: 99, name: 'NYJC_SEL_ALERT', divisionId: 11 },
  { id: 100, name: 'QUEUE_CHANGE_SEL', divisionId: 11 },
  { id: 101, name: 'QUEUE_MERGE_REQUEST', divisionId: 11 },
  { id: 102, name: 'NYJC_A&N_DEATH_CASE_DRILLDOWN_ACCESS', divisionId: 12 },
  { id: 103, name: 'NYJC_ADJ_CASE_DRILLDOWN_ACCESS', divisionId: 12 },
  { id: 104, name: 'NYJC_INITIATE_ADJ_PROS_ACCESS', divisionId: 12 },
  { id: 105, name: 'NYJC_PROS_CASE_DRILLDOWN_ACCESS', divisionId: 12 },
  { id: 206, name: 'QUEUE_DENOVO_REVIEW', divisionId: 12 },
  { id: 107, name: 'QUEUE_SPIG', divisionId: 12 },
  { id: 108, name: 'NYJC_A&N_DEATH_CASE_DRILLDOWN_ACCESS', divisionId: 13 },
  { id: 109, name: 'NYJC_A&N_DEATH_CASE_DRILLDOWN_ACCESS', divisionId: 14 },
  { id: 110, name: 'QUEUE_OSP', divisionId: 14 },
  { id: 111, name: 'NYJC_A&N_DEATH_CASE_DRILLDOWN_ACCESS', divisionId: 16 },
  { id: 112, name: 'NYJC_ADJ_CASE_DRILLDOWN_ACCESS', divisionId: 16 },
  { id: 113, name: 'NYJC_IFSU_OMBUDS_GO_TO_CASE_ACCESS', divisionId: 16 },
  { id: 114, name: 'NYJC_PROS_CASE_DRILLDOWN_ACCESS', divisionId: 16 },
  { id: 115, name: 'QUEUE_IFSU', divisionId: 16 },
  { id: 116, name: 'NYJC_A&N_DEATH_CASE_DRILLDOWN_ACCESS', divisionId: 17 },
  { id: 117, name: 'NYJC_FORENSICS_ACCESS', divisionId: 17 },
  { id: 118, name: 'QUEUE_PQI', divisionId: 18 },
  { id: 119, name: 'QUEUE_PQI_AGING', divisionId: 18 },
  { id: 120, name: 'QUEUE_PQI_AUDIT', divisionId: 18 },
  { id: 121, name: 'QUEUE_PQI_AUDIT_OPWDD', divisionId: 18 },
  { id: 122, name: 'QUEUE_PQI_HOLD', divisionId: 18 },
  { id: 123, name: 'QUEUE_PQI_SUP', divisionId: 18 },
  { id: 124, name: 'QUEUE_PQI_SUP_REVIEW', divisionId: 18 },
  { id: 125, name: 'NYJC_A&N_DEATH_CASE_DRILLDOWN_ACCESS', divisionId: 18 },
  { id: 126, name: 'NYJC_ADJ_CASE_DRILLDOWN_ACCESS', divisionId: 18 },
  { id: 127, name: 'NYJC_CAP_ACTIVITY_CSN_ISN_DRILLDOWN_ACCESS', divisionId: 18 },
  { id: 128, name: 'AA_JC_QUEUE', divisionId: 18 },
  { id: 129, name: 'NYJC_A&N_DEATH_CASE_DRILLDOWN_ACCESS', divisionId: 19 },
  { id: 130, name: 'NYJC_ADD_SEALED_ACCESS_ACTIVITY', divisionId: 19 },
  { id: 131, name: 'NYJC_CAP_ACTIVITY_CSN_ISN_DRILLDOWN_ACCESS', divisionId: 19 },
];

export interface userEntry {
  id: number;
  name: string;
}

export interface PositionAssignment {
  divisionId: number;
  supervisorId: number;
  queueIds: number[];
  users: userEntry[];
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  positions: Position[] = POSITION;
  lastSavedPositionId: number | null = null; //can be either type number or type null , initialized as null
  showPositionList = true;

  private subscription!: Subscription; //subscription for the message to be shown when saved
  private routerSubscription!: Subscription; //subscription for the change of route, displays save message after save is pressed and route returns to positions

  constructor(
    private router: Router,
    private communication: Communication,
  ) {
    this.router.events
      .pipe(
        filter(
          (event) =>
            event instanceof //emits router events for every navigation, this will run for every navigation even when you return from responsibilities page
            NavigationEnd,
        ),
      )
      .subscribe(() => {
        this.showPositionList = !this.router.url.includes('/position/'); // hides positions list once a position is selected, shows again once returned
        const state = history.state as {
          //history.state is a native browser api that stores data passed during a navigation
          saved?: boolean; //saved is true when the button gets pressed
          positionId?: number; //saves responsibilities to exact position id
        };

        if (state?.saved && state.positionId) {
          //only show a message if save button is pressed
          this.lastSavedPositionId = state.positionId; //re-renders template and displays message after save
        }
      });
  }

  ngOnInit() {
    this.subscription = this.communication.currentMessage.subscribe((message) => {
      console.log('Message Received;', message);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }

  goToPosition(pos: { id: number }) {
    this.router.navigate(['/position', pos.id]);
  }
}
