import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PositionAssignment, getPositionList } from '../position-selection/position-selection';

export interface Queues {
  id: number;
  name: string;
  divisionId: number;
}

export function getQueues() {
  return [
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
}

@Component({
  selector: 'app-queues-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './queues-component.html',
  styleUrl: './queues-component.scss',
})
export class QueuesComponent implements OnInit {
  positionId: number = 0;
  userId: number = 0;
  displayName?: string = '';
  divisionID: number = 0;
  isUserMode: boolean = false;

  availableQueues: Queues[] = [];
  selectedQueues: Queues[] = [];

  showMessage: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const positionId = this.route.snapshot.paramMap.get('positionId');
    const userId = this.route.snapshot.paramMap.get('userId');

    if (userId && positionId) {
      //user mode
      this.isUserMode = true;
      this.positionId = Number(positionId);
      this.userId = Number(userId);
      const assignData = localStorage.getItem(`position_assignment_${this.positionId}`);
      if (assignData) {
        const data = JSON.parse(assignData);
        const user = data.users?.find((u: any) => u.id === this.userId);
        this.divisionID = user?.divisionId || 0;
      }
    } else if (id) {
      //position mode
      this.isUserMode = false;
      this.positionId = Number(id);
      const pos = getPositionList().find((p) => p.id === this.positionId);
      this.displayName = pos?.name || '';
      const assignData = localStorage.getItem(`position_assignment_${this.positionId}`);
      if (assignData) {
        const data = JSON.parse(assignData); //if found in local storage parse json data
        this.divisionID = data.divisionId || 0; // set new id to id found in stored data or default to 0
      }
    }
    this.loadSavedQueue();
  }

  loadSavedQueue() {
    if (!this.divisionID) {
      this.availableQueues = [];
      this.selectedQueues = [];
      return;
    }
    this.availableQueues = getQueues().filter((q) => q.divisionId === this.divisionID); //filter QUEUES to only include queues within current division
    this.selectedQueues = []; //initializes selected queues as empty

    const saved = localStorage.getItem(`position_assignment_${this.positionId}`);
    if (saved) {
      const data: PositionAssignment = JSON.parse(saved);
      if (this.isUserMode) {
        const user = data.users?.find((u: any) => u.id === this.userId);
        if (user) {
          this.displayName = user.name;
          if (user.queueIds && user.queueIds.length > 0) {
            for (let i = 0; i < user.queueIds.length; i++) {
              const queue = getQueues().find((q) => q.id === user.queueIds![i]);
              if (queue) {
                this.selectedQueues.push(queue);
              }
            }
            this.availableQueues = this.availableQueues.filter(
              (q) => !this.selectedQueues.find((sq) => sq.id === q.id),
            );
          }
        }
      } else {
        if (data.queueIds && data.queueIds.length > 0) {
          for (let i = 0; i < data.queueIds.length; i++) {
            const queueId = data.queueIds[i];
            const queue = getQueues().find((q) => q.id === queueId); //if data.queueIds exists loop through saved queue ids and find the corresponding queue object and push into selected queues array
            if (queue) {
              this.selectedQueues.push(queue);
            }
          }
        }
        this.availableQueues = this.availableQueues.filter(
          (q) => !this.selectedQueues.find((sq) => sq.id === q.id),
        );
      }
    }
  }

  addQueue(queue: Queues) {
    this.availableQueues = this.availableQueues.filter((q) => q.id !== queue.id); //adds all queues to selected section
    if (!this.selectedQueues.find((q) => q.id === queue.id)) {
      this.selectedQueues = [...this.selectedQueues, queue];
    }
  }

  removeQueue(queue: Queues) {
    this.selectedQueues = this.selectedQueues.filter((q) => q.id !== queue.id); // removes selected items using 'filter' function
  }

  addAllQueues() {
    this.availableQueues = []; //moves all available to selected
    this.selectedQueues = [...getQueues().filter((q) => q.divisionId === this.divisionID)];
  }

  removeAllQueues() {
    this.selectedQueues = []; //moves all selected back to available
    this.availableQueues = [...getQueues().filter((q) => q.divisionId === this.divisionID)];
  }

  goBack() {
    if (this.isUserMode) {
      //navigate back to user overview
      this.router.navigate(['/user', this.userId]);
    } else {
      this.router.navigate(['/position', this.positionId]);
    }
  }
  saveQueues() {
    const key = `position_assignment_${this.positionId}`;
    const saved = localStorage.getItem(key);

    //initialize existing structure
    let existing: PositionAssignment = saved
      ? JSON.parse(saved)
      : {
          divisionId: 0,
          supervisorId: 0,
          queueIds: [],
          users: [],
        };

    // ensure arrays exist to avoid .find() on undefined
    existing.users = existing.users || [];

    if (this.isUserMode) {
      //  find user
      const user = existing.users.find((u: any) => u.id === this.userId);
      if (user) {
        // map objects to ids
        user.queueIds = this.selectedQueues.map((q: any) => q.id);
      } else {
        //case where user doesn't exist in existing.users
        existing.users.push({
          id: this.userId,
          queueIds: this.selectedQueues.map((q: any) => q.id),
        });
      }
    } else {
      existing.queueIds = this.selectedQueues.map((q: any) => q.id);
    }

    localStorage.setItem(key, JSON.stringify(existing));

    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
      this.goBack();
    }, 1500);
  }
}
