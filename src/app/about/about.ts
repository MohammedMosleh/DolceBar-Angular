import { Component } from '@angular/core';
  
@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
 darkMode = false;

 
  student1Name = 'Mohammed Mosleh';
  student1Id = '211755335';
  student1Image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdodgwE3D08dn8fl-ioN19gOyzitR7oddTbA&s';

  student2Name = 'Hassan Qablawi';
  student2Id = '322475872';
  student2Image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZpTGit3bPRiRxQFFrQlWCrQPgwBpcve72zw&s';

  toggleMode() {
    this.darkMode = !this.darkMode;
  }
}


