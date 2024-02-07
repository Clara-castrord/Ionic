import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

interface Tarefa {
  nome: string;
  concluida: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tarefas: Tarefa[] = [
    { nome: 'Tarefa 1', concluida: false },
    { nome: 'Tarefa 2', concluida: true }
  ];

  constructor(public alertController: AlertController) {}

  async adicionarTarefa() {
    const alert = await this.alertController.create({
      header: 'Nova Tarefa',
      inputs: [
        {
          name: 'tarefa',
          type: 'text',
          placeholder: 'Nome da Tarefa'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Adicionar',
          handler: (data) => {
            if (data.tarefa) {
              this.tarefas.push({ nome: data.tarefa, concluida: false });
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async excluirTarefa(tarefa: Tarefa) {
    const alert = await this.alertController.create({
      header: 'Confirmar Exclusão',
      message: `Deseja realmente excluir a tarefa "${tarefa.nome}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          handler: () => {
            this.tarefas = this.tarefas.filter(item => item !== tarefa);
          }
        }
      ]
    });

    await alert.present();
  }
}
export class AppModule {}
