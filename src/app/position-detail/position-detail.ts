import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { POSITION } from '../position-selection/position-selection';

type CategoryKey = 'selectedResponsibilities';

export interface SourceCategory {
  key: CategoryKey;
  label: string;
  items: string[];
}
export interface SelectedCategory {
  key: CategoryKey;
  items: string[];
}

export const RESPONSIBILITIES = [
  //Call Center Rep - VPPS 1 (Intake Center Rep X)
  { name: 'Intake Center Representative(VPPS1) - Team 1', positionId: 1 },
  { name: 'NYJC FC RO Responsibility', positionId: 1 },
  { name: 'NYJC Incident Details Access', positionId: 1 },
  //Call Center Sup VPPS 2/3 (Intake Center Sup X)
  { name: 'Intake Center Supervisor (VPPS2, VPPS3) - Team 1', positionId: 2 },
  { name: 'Inv to Pending Provider Updates', positionId: 2 },
  { name: 'NYJC AudioEdit Responsibility', positionId: 2 },
  { name: 'NYJC FC RO Responsibility', positionId: 2 },
  { name: 'NYJC Incident Details Access', positionId: 2 },
  { name: 'NYJC Incident Splitting Responsibility', positionId: 2 },
  { name: 'NYJC Infoline Agent', positionId: 2 },
  { name: 'NYJC MEDA Comm Users', positionId: 2 },
  { name: 'NYJC Pending Provider Update', positionId: 2 },
  { name: 'NYJC Provider Profile', positionId: 2 },
  { name: 'NYJC Sealed 6 Month Incidents Access', positionId: 2 },
  { name: 'Pend Prov Update to Pend SOA Review', positionId: 2 },
  { name: 'Pend SOA Review to Pend Prov Update', positionId: 2 },
  { name: 'Pending Provider Updates to Inv', positionId: 2 },
  //Call Center Director (Intake Center Sup X)
  { name: 'Intake Center Supervisor (VPPS2, VPPS3) - Team 1', positionId: 3 },
  { name: 'Inv to Pending Provider Updates', positionId: 3 },
  { name: 'NYJC All Incidents and Sealed Access', positionId: 3 },
  { name: 'NYJC AudioEdit Responsibility', positionId: 3 },
  { name: 'NYJC FC History Responsibility', positionId: 3 },
  { name: 'NYJC FC Meeting Responsibility', positionId: 3 },
  { name: 'NYJC FC Responsibility', positionId: 3 },
  { name: 'NYJC FC Status Responsibility', positionId: 3 },
  { name: 'NYJC Incident Details Access', positionId: 3 },
  { name: 'NYJC Incident Splitting Responsibility', positionId: 3 },
  { name: 'NYJC Infoline Supervisor', positionId: 3 },
  { name: 'NYJC MEDA Comm Users', positionId: 3 },
  { name: 'NYJC Pending Provider Update', positionId: 3 },
  { name: 'NYJC Provider Profile', positionId: 3 },
  { name: 'NYJC QA Sealed Cases Responsibility', positionId: 3 },
  { name: 'NYJC Sealed 6 Month Incidents Access', positionId: 3 },
  { name: 'NYJC Sealed Access Activity Access', positionId: 3 },
  { name: 'NYJC Sealed Case Access', positionId: 3 },
  { name: 'Pend Prov Update to Pend SOA Review', positionId: 3 },
  { name: 'Pend SOA Review to Pend Prov Update', positionId: 3 },
  { name: 'Pending Provider Updates to Inv', positionId: 3 },
  //Infoline Agent (Intake Center Rep X Or Intake Center Sup X)
  { name: 'Intake Center Representative(VPPS1) - Team 1', positionId: 4 },
  { name: 'RNYJC FC RO Responsibility', positionId: 4 },
  { name: 'NYJC Incident Details Access1', positionId: 4 },
  { name: 'NYJC Info Line Activities Responsibility', positionId: 4 },
  { name: 'NYJC Infoline Agent', positionId: 4 },
  //3BDR Investigator (Incident Review and Assign Non Criminal Inv X)
  { name: 'Investigator', positionId: 5 },
  { name: 'Incident Review and Assignment - Investigator', positionId: 5 },
  { name: 'NYJC CBC Authorized Persons Responsibility', positionId: 5 },
  { name: 'NYJC Contact Attachment Access', positionId: 5 },
  { name: 'NYJC Case CPR Responsibility', positionId: 5 },
  { name: 'NYJC EVITE Incident', positionId: 5 },
  { name: 'NYJC FC RO Responsibility', positionId: 5 },
  { name: 'NYJC Incident Details Access', positionId: 5 },
  { name: 'NYJC Incident Evite Contact Responsibility', positionId: 5 },
  { name: 'NYJC PQI Referral Responsibility', positionId: 5 },
  { name: 'NYJC Triage Division Responsibility', positionId: 5 },
  { name: 'OGC Closure Report Read Only View', positionId: 5 },
  //3BDR Supervisor (Incident Review and Assignment HQ Sup X Intake Sup)
  { name: 'Supervising Investigator', positionId: 6 },
  { name: 'Incident Review and Assignment - Investigator', positionId: 6 },
  { name: 'Incident Review and Assignment - Sup Investigator', positionId: 6 },
  { name: 'NYJC Contact Attachment Access', positionId: 6 },
  { name: 'Intake Center Supervisor (VPPS2, VPPS3) - Team 1', positionId: 6 },
  { name: 'NYJC CBC Authorized Persons Responsibility', positionId: 6 },
  { name: 'NYJC Case CPR Responsibility', positionId: 6 },
  { name: 'NYJC Closed Case Updates Responsibility', positionId: 6 },
  { name: 'NYJC EVITE Incident', positionId: 6 },
  { name: 'NYJC FC RO Responsibility', positionId: 6 },
  { name: 'NYJC Incident Details Access', positionId: 6 },
  { name: 'NYJC Incident Evite Contact Responsibility', positionId: 6 },
  { name: 'NYJC PQI Referral Responsibility', positionId: 6 },
  { name: 'NYJC Triage Division Responsibility', positionId: 6 },
  { name: 'OGC Closure Report Read Only View', positionId: 6 },
  //Fulfillment Rep (Fullfillment Rep X)
  { name: 'Fulfillment', positionId: 7 },
  //OSP Investigator (Out of State Schools Rep X)
  { name: 'Investigator', positionId: 8 },
  { name: 'NYJC Case CPR Responsibility', positionId: 8 },
  { name: 'NYJC Case Evite Contact Responsibility', positionId: 8 },
  { name: 'NYJC Case OSP Checklist Access', positionId: 8 },
  { name: 'NYJC Contact Attachment Access', positionId: 8 },
  { name: 'NYJC EVITE Case', positionId: 8 },
  { name: 'NYJC Incident Details RO', positionId: 8 },
  { name: 'NYJC PQI Referral Responsibility', positionId: 8 },
  { name: 'Out of State School - Staff', positionId: 8 },
  { name: 'NYJC Notable Responsibility - ReadOnly', positionId: 8 },
  { name: 'NYJCInvToPendingReview', positionId: 8 },
  { name: 'NYJC Closed Case Updates Responsibility', positionId: 8 },
  //SOAR Investigator (Incident Review and Assign Non-Criminal Inv X)
  { name: 'COPY_CASE_CLOSEDATE_TO_DOD', positionId: 9 },
  { name: 'Incident Review and Assignment - Investigator', positionId: 9 },
  { name: 'Inv to Pending Provider Updates', positionId: 9 },
  { name: 'NYJC CPR Contact Review', positionId: 9 },
  { name: 'NYJC Case CPR Responsibility', positionId: 9 },
  { name: 'NYJC Case Evite Contact Responsibility', positionId: 9 },
  { name: 'NYJC Case OSP Checklist Access', positionId: 9 },
  { name: 'NYJC Closed Case Updates Responsibility', positionId: 9 },
  { name: 'NYJC Contact Attachment Access', positionId: 9 },
  { name: 'NYJC EVITE Case', positionId: 9 },
  { name: 'NYJC PQI Referral Responsibility', positionId: 9 },
  { name: 'NYJC Pending Provider Update', positionId: 9 },
  { name: 'NYJC Pending Review Profile User', positionId: 9 },
  { name: 'NYJC Triage Division Responsibility', positionId: 9 },
  { name: 'OGC Closure Report Read Only View', positionId: 9 },
  { name: 'Pend Prov Update to Pend SOA Review', positionId: 9 },
  { name: 'Pend SOA Review to Pend Prov Update', positionId: 9 },
  { name: 'Pending Provider Updates to Inv', positionId: 9 },
  //SOAR Supervisor (Incident Review and Assignment HQ Sup X Intake Sup)
  { name: 'COPY_CASE_CLOSEDATE_TO_DOD', positionId: 10 },
  { name: 'Incident Review and Assignment - Investigator', positionId: 10 },
  { name: 'Incident Review and Assignment - Sup Investigator', positionId: 10 },
  { name: 'Inv Determination Accepted to Investigation', positionId: 10 },
  { name: 'Inv Determination Accepted to Investigation Comp', positionId: 10 },
  { name: 'Inv Pending OGC Review to Determination Accepted', positionId: 10 },
  { name: 'Inv Pending OGC Review to Investigation', positionId: 10 },
  { name: 'Inv Pending OGC Review to Linked', positionId: 10 },
  { name: 'Inv Pending Review to Pending OGC Review', positionId: 10 },
  { name: 'Inv to Pending Provider Updates', positionId: 10 },
  { name: 'NYJC CPR Contact Review', positionId: 10 },
  { name: 'NYJC Case CPR Responsibility', positionId: 10 },
  { name: 'NYJC Case Checklist Access', positionId: 10 },
  { name: 'NYJC Case Evite Contact Responsibility', positionId: 10 },
  { name: 'NYJC Case OSP Checklist Access', positionId: 10 },
  { name: 'NYJC Closed Case Updates Responsibility', positionId: 10 },
  { name: 'NYJC Contact Attachment Access', positionId: 10 },
  { name: 'NYJC EVITE Case', positionId: 10 },
  { name: 'NYJC InvSupervisor Edit Access', positionId: 10 },
  { name: 'NYJC Incident Details RO', positionId: 10 },
  { name: 'NYJC JC Investigations Sup Responsibility', positionId: 10 },
  { name: 'NYJC PQI Referral Responsibility', positionId: 10 },
  { name: 'NYJC Pending Provider Update', positionId: 10 },
  { name: 'NYJC Pending Review Profile User', positionId: 10 },
  { name: 'NYJC Provider Data Admin', positionId: 10 },
  { name: 'NYJC Triage Division Responsibility', positionId: 10 },
  { name: 'OGC Closure Report Read Only View', positionId: 10 },
  { name: 'Out of State School - Staff', positionId: 10 },
  { name: 'Pend Prov Update to Pend SOA Review', positionId: 10 },
  { name: 'Pend SOA Review to Pend Prov Update', positionId: 10 },
  { name: 'Pending Provider Updates to Inv1', positionId: 10 },
  { name: 'Supervising Investigator', positionId: 10 },
  //Non-Criminal  Investigator (Region 1 Non Criminal Inv X)
  { name: 'Investigator', positionId: 11 },
  { name: 'NYJC Case CPR Responsibility', positionId: 11 },
  { name: 'NYJC Case Checklist Access', positionId: 11 },
  { name: 'NYJC Case Evite Contact Responsibility', positionId: 11 },
  { name: 'NYJC Closed Case Updates Responsibility', positionId: 11 },
  { name: 'NYJC EVITE Case', positionId: 11 },
  { name: 'NYJC Incident Details RO', positionId: 11 },
  { name: 'NYJC Notable Responsibility - ReadOnly', positionId: 11 },
  { name: 'NYJC PQI Referral Responsibility', positionId: 11 },
  { name: 'NYJCInvToPendingReview', positionId: 11 },
  { name: 'OGC Closure Report Read Only View', positionId: 11 },

  //Criminal Investigator (Region 1 Criminal Inv X)
  { name: 'Criminal Investigator', positionId: 12 },
  { name: 'NYJC Case CPR Responsibility', positionId: 12 },
  { name: 'NYJC Case Checklist Access', positionId: 12 },
  { name: 'NYJC Case Evite Contact Responsibility', positionId: 12 },
  { name: 'NYJC Closed Case Updates Responsibility', positionId: 12 },
  { name: 'NYJC EVITE Case', positionId: 12 },
  { name: 'NYJC Incident Details RO', positionId: 12 },
  { name: 'NYJC Notable Responsibility - ReadOnly', positionId: 12 },
  { name: 'NYJC PQI Referral Responsibility', positionId: 12 },
  { name: 'NYJCInvToPendingReview', positionId: 12 },
  { name: 'OGC Closure Report Read Only View', positionId: 12 },
  //Supervising Investigator
  { name: 'All Investigations Responsibility', positionId: 13 },
  { name: 'COPY_CASE_CLOSEDATE_TO_DOD', positionId: 13 },
  { name: 'Inv Pending Review to Pending OGC Review', positionId: 13 },
  { name: 'NYJC Case CPR Responsibility', positionId: 13 },
  { name: 'NYJC Case Checklist Access', positionId: 13 },
  { name: 'NYJC Case Evite Contact Responsibility', positionId: 13 },
  { name: 'NYJC Case My Divisions', positionId: 13 },
  { name: 'NYJC Closed Case Updates Responsibility', positionId: 13 },
  { name: 'NYJC EVITE Case', positionId: 13 },
  { name: 'NYJC GoToMerge Read Responsibility', positionId: 13 },
  { name: 'NYJC Incident Details RO', positionId: 13 },
  { name: 'NYJC InvSupervisor Edit Access1', positionId: 13 },
  { name: 'NYJC JC Investigations Sup Responsibility', positionId: 13 },
  { name: 'NYJC Notable Responsibility - ReadOnly', positionId: 13 },
  { name: 'NYJC PQI Referral Responsibility', positionId: 13 },
  { name: 'NYJC Provider Profile', positionId: 13 },
  { name: 'NYJC Sealed Access Activity Access', positionId: 13 },
  { name: 'NYJCInvToPendingReview', positionId: 13 },
  { name: 'OGC Closure Report Read Only View', positionId: 13 },
  { name: 'Supervising Investigator', positionId: 13 },
  //Inv. Admin. Assistant(Region 1 Non Criminal Inv X)
  { name: 'NYJC Case My Divisions', positionId: 14 },
  { name: 'NYJC Closed Case Updates Responsibility', positionId: 14 },
  { name: 'NYJC EVITE Case', positionId: 14 },
  { name: 'NYJC GoToMerge Read Responsibility', positionId: 14 },
  { name: 'NYJC Incident Details RO', positionId: 14 },
  { name: 'NYJC Notable Responsibility - ReadOnly', positionId: 14 },
  { name: 'NYJC PQI Referral Responsibility', positionId: 14 },
  { name: 'NYJC Provider Profile', positionId: 14 },
  { name: 'NYJCInvToPendingReview', positionId: 14 },
  { name: 'OGC Closure Report Read Only View', positionId: 14 },
  //Asst. Chief of Investigations (Assistant Chief of Investigations Region 1 Rep X)
  { name: 'Assistant Chief of Investigations', positionId: 15 },
  { name: 'COPY_CASE_CLOSEDATE_TO_DOD', positionId: 15 },
  { name: 'Inv Pending OGC Review to Linked', positionId: 15 },
  { name: 'Inv Pending Review to Pending OGC Review', positionId: 15 },
  { name: 'NYJC Access Audit', positionId: 15 },
  { name: 'NYJC Case CPR Responsibility', positionId: 15 },
  { name: 'NYJC Case Checklist Access', positionId: 15 },
  { name: 'NYJC Case Evite Contact Responsibility', positionId: 15 },
  { name: 'NYJC Case My Divisions', positionId: 15 },
  { name: 'NYJC Closed Case Updates Responsibility', positionId: 15 },
  { name: 'NYJC EVITE Case', positionId: 15 },
  { name: 'NYJC Incident Details RO', positionId: 15 },
  { name: 'NYJC InvSupervisor Edit Access', positionId: 15 },
  { name: 'NYJC JC Investigations Sup Responsibility', positionId: 15 },
  { name: 'NYJC Notable Responsibility', positionId: 15 },
  { name: 'NYJC PQI Referral Responsibility', positionId: 15 },
  { name: 'NYJC Provider Profile', positionId: 15 },
  { name: 'NYJC QA Sealed Cases Responsibility', positionId: 15 },
  { name: 'NYJC Sealed Access Activity Access', positionId: 15 },
  { name: 'OGC Closure Report Read Only View', positionId: 15 },
  //Death Investigator (Death Investigations HQ Non-Criminal Inv X)
  { name: 'Death Investigations - Investigator', positionId: 16 },
  { name: 'NYJC Case CPR Responsibility', positionId: 16 },
  { name: 'NYJC Case Evite Contact Responsibility', positionId: 16 },
  { name: 'NYJC Closed Case Updates Responsibility', positionId: 16 },
  { name: 'NYJC EVITE Case', positionId: 16 },
  { name: 'NYJC Incident Details RO', positionId: 16 },
  { name: 'NYJC MRU Case Checklist Access', positionId: 16 },
  { name: 'NYJC Notable Responsibility - ReadOnly', positionId: 16 },
  { name: 'NYJCInvToPendingReview', positionId: 16 },
  { name: 'OGC Closure Report Read Only View', positionId: 16 },
  //Supervising Death Inv. (Death Investigations HQ Sup X)
  { name: 'Death Investigations - Supervising Investigator', positionId: 17 },
  { name: 'Inv Determination Accepted to Investigation', positionId: 17 },
  { name: 'Inv Determination Accepted to Investigation Comp', positionId: 17 },
  { name: 'Inv Determination Accepted to Linked', positionId: 17 },
  { name: 'Inv Pending OGC Review to Determination Accepted', positionId: 17 },
  { name: 'Inv Pending OGC Review to Investigation', positionId: 17 },
  { name: 'Inv Pending OGC Review to Linked', positionId: 17 },
  { name: 'Inv Pending Review to Pending OGC Review', positionId: 17 },
  { name: 'NYJC Case CPR Responsibility', positionId: 17 },
  { name: 'NYJC Case Evite Contact Responsibility', positionId: 17 },
  { name: 'NYJC Closed Case Updates Responsibility', positionId: 17 },
  { name: 'NYJC Correspondence Approval Privilege', positionId: 17 },
  { name: 'NYJC EVITE Case', positionId: 17 },
  { name: 'NYJC Incident Details RO', positionId: 17 },
  { name: 'NYJC MRU Case Checklist Access', positionId: 17 },
  { name: 'NYJC Notable Responsibility', positionId: 17 },
  { name: 'NYJC QA Sealed Cases Responsibility', positionId: 17 },
  { name: 'NYJC Return Mail Case Updates Responsibility', positionId: 17 },
  { name: 'NYJCInvToPendingReview', positionId: 17 },
  { name: 'NYJC_DOD_EDIT', positionId: 17 },
  { name: 'OGC Closure Report Read Only View', positionId: 17 },
];

@Component({
  selector: 'app-position-detail',
  imports: [CommonModule],
  templateUrl: './position-detail.html',
  styleUrl: './position-detail.scss',
})
export class PositionDetail implements OnInit {
  positionId: number = 0;
  positionName: string = ' ';
  showMessage: boolean = false;
  //source array
  source: SourceCategory[] = [
    {
      //source: json FULLY CUSTOMIZABLE
      key: 'selectedResponsibilities',
      label: 'Responsibilities Below: ',
      //items = responsibilities; for now I have it labeled as responsibility 1-5(subject to change)
      items: [],
    },
  ];
  //selected array
  selected: SelectedCategory[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.positionId = Number(id);
      this.positionName = POSITION.find((p) => p.id === Number(id))?.name || '';
      this.source[0].items = RESPONSIBILITIES.filter((r) => r.positionId === this.positionId).map(
        (r) => r.name,
      );
      this.loadSavedResponsibilities();
    }
    console.log('position selected');
  }

  loadSavedResponsibilities() {
    const saved = localStorage.getItem(`position_${this.positionId}`); //retrieves saved data from local storage for the current position
    if (saved) {
      const data = JSON.parse(saved); //converts saved string into data object
      if (data.selected) {
        this.selected = data.selected; //loads saved data into selected array to display in position detail
        this.selected.forEach((cat) => {
          const sourceCat = this.source.find((c) => c.key === cat.key);
          if (sourceCat) {
            sourceCat.items = sourceCat.items.filter((i) => !cat.items.includes(i));
          }
        });
      }
    }
  }

  private ensureSelectedCategory(key: CategoryKey): SelectedCategory {
    //allows lazy initialization
    let cat = this.selected.find((c) => c.key === key); //cat constant created to find the category in the selected array that matches the provided key
    if (!cat) {
      cat = { key, items: [] }; // if no responsibilities have been selected yet, a new category object is created with the provided key and an empty items array
      this.selected.push(cat); //new object pushed into selected array to be used for storing selected responsibilities as they are added
    }
    return cat;
  }

  addItem(categoryKey: CategoryKey, item: string) {
    //adds specific item and transfers to selected and no longer available
    const cat = this.ensureSelectedCategory(categoryKey);
    if (!cat.items.includes(item)) {
      cat.items.push(item);
      const sourceCat = this.source.find((c) => c.key === categoryKey);
      if (sourceCat) {
        sourceCat.items = sourceCat.items.filter((i) => i !== item);
      }
    }
    console.log('Item Added!');
  }

  addAll(categoryKey: CategoryKey) {
    //adds all items and removes from available
    const sourceCat = this.source.find((c) => c.key === categoryKey);
    if (!sourceCat) return;
    const selectedCat = this.ensureSelectedCategory(categoryKey);
    sourceCat.items.forEach((item) => {
      if (!selectedCat.items.includes(item)) {
        selectedCat.items.push(item);
      }
    });
    sourceCat.items = [];
    console.log('All Items Added!');
  }

  removeAll(categoryKey: CategoryKey) {
    //removes all items and returns from selected to available
    const sourceCat = this.source.find((c) => c.key === categoryKey);
    const selectedCat = this.ensureSelectedCategory(categoryKey);
    if (!sourceCat || !selectedCat) return;
    sourceCat.items.push(...selectedCat.items);
    sourceCat.items.sort();
    selectedCat.items = [];
    console.log('All Items Removed!');
  }

  removeItem(categoryKey: CategoryKey, item: string) {
    //allows you to remove an Item that has been selected
    const cat = this.selected.find((c) => c.key === categoryKey);
    if (!cat) return;
    cat.items = cat.items.filter((i) => i !== item);
    if (cat.items.length === 0) {
      this.selected = this.selected.filter((c) => c.key !== categoryKey);
    }
    const sourceCat = this.source.find((c) => c.key === categoryKey);
    if (sourceCat) {
      sourceCat.items.push(item); //pushes selected item back to available after removed
      sourceCat.items.sort(); //sorts pushed item into correct spot in array
    }
    console.log('Removed Item!');
  }

  saveResponsibilities() {
    localStorage.setItem(
      `position_${this.positionId}`,
      JSON.stringify({
        positionId: this.positionId,
        selected: this.selected,
      }),
    ); //localStorage API uses setItem to add values and read back the data saved to local storage , most commonly used for storing json constants
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
      this.cancel();
    }, 1500);
  }

  cancel() {
    this.router.navigate(['/position', this.positionId]); //navigates back to positions
    console.log('cancel successful');
  }
}
