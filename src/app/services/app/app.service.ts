import { Injectable } from '@angular/core';
import axios from 'axios';
import { IMember, Member } from 'src/app/models/member.model';

interface SheetColumn {
  v: string;
}

interface SheetRow {
  c: SheetColumn[];
}

enum SheetColumns {
  ID,
  NAME,
  PHONE,
  ADMIN
}

class Row implements SheetRow {
  
  public constructor(private cols: SheetColumn[]) {

  }

  public get c(): SheetColumn[] {
    return this.cols;
  };

  public getId(): number {
    return parseInt(this.cols[SheetColumns.ID]?.v ?? '0');
  }

  public getName(): string | null {
    return this.cols[SheetColumns.NAME]?.v ?? null;
  }

  public getPhone(): string | null {
    return this.cols[SheetColumns.PHONE]?.v ?? null;
  }

  public getAdmin(): string | null {
    return this.cols[SheetColumns.ADMIN]?.v?.toLowerCase() ?? null;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private sheetId = '1jjoiPxnaH4omgNFs8GbmOTzXfBM9R_oj5flsVEFrq3s'; 
  private baseUrl = `https://docs.google.com/spreadsheets/d/${this.sheetId}/gviz`;

  constructor() { }
  
  public async login(user: string, phone: string): Promise<Member | null> {
    const members = await this.getMembers();
    const formatedName = user.trim().toLowerCase();
    const formatedPhone = phone.replaceAll(' ', '').replaceAll('-','');

    console.log(members);
    console.log('look: ' + formatedName + ' '  + formatedPhone);

    return members.find((member) => formatedPhone === member.getFormatedPhone()) || null;
  }

  public async getMembers(): Promise<Member[]> {
    const sheet = 'all_users';
    const query = encodeURIComponent('Select *');
    const url = `${this.baseUrl}/tq?&sheet=${sheet}&tq=${ query}`;

    return new Promise((resolve, reject) => {
      axios.get(url).then((response) => {
        try {
          
          const jsonData = JSON.parse(response.data.substring(47).slice(0, -2));
          const members: Member[] = this.formatData(jsonData.table.rows as SheetRow[])
            .filter((member) => member.name !== '' && member.name !== 'Nome')

          const sorted = members.sort((a, b) => {
            const nameA = a.getNormalizedName().toUpperCase();
            const nameB = b.getNormalizedName().toUpperCase();

            return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
          });

          resolve(sorted);
        
        } catch (error) {
          reject(error);  
        }
        
      });
    });    
  }

  private formatData(rows: SheetRow[]): Member[] {
    return rows.map((r) => {
      const row = new Row(r.c);

      return new Member({
        id: row.getId(),
        name: row.getName()?.trim() ?? '',
        phone: row.getPhone()?.replaceAll(' ', '').replaceAll('-', '') ?? '',
        admin: row.getAdmin() === 'x'
      });
    });
  }
}
