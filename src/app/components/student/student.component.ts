import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from '../../services/student.service';
import { MatDialog } from '@angular/material/dialog';
import { AddStudentComponent } from '../add-student/add-student.component';

export interface Student {
  name: string;
  species: string;
  gender: string;
  house: string;
  dateOfBirth: Date;
  yearOfBirth: number;
  ancestry: string;
  hairColour: string;
  wand: Wand[];
  patronus: string;
  hogwartsStudent: boolean;
  hogwartsStaff: boolean;
  actor: string;
  alive: boolean;
  image: string;
}

export interface Wand {
  wood: string;
  core: string;
  length: number;
}

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'patronus', 'yearOfBirth', 'image'];
  dataSource: MatTableDataSource<Student>;
  student: Student[] = [];
  anio: number = 0;

  spiner = true;
  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public studentService: StudentService, public dialog: MatDialog) {
  	this.dataSource = new MatTableDataSource(this.student);
  }

  ngOnInit(): void {
  	this.obtenerEstudiantes();
  	this.anio = new Date().getFullYear();
  }


  openDialog() {
    this.dialog.open(AddStudentComponent);
  }

  obtenerEstudiantes(){
    this.spiner = true;
    this.studentService.getAllStudent()
      .subscribe( (resp:any) => {
        console.log(resp);
        this.dataSource.data = resp;
        this.spiner = false;
               
      })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  ngAfterViewInit() {
    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
