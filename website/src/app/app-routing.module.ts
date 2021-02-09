import { AboutComponent } from './about/about.component';
import { WikiComponent } from './wiki/wiki.component';
import { TelegramComponent } from './telegram/telegram.component';
import { GithubComponent } from './github/github.component';
import { DiscordComponent } from './discord/discord.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '',   redirectTo: '/bhtbot', pathMatch: 'full' },
  { path: 'bhtbot', component: ChatbotComponent },
  { path: 'discord', component: DiscordComponent },
  { path: 'github', component: GithubComponent },
  { path: 'telegram', component: TelegramComponent },
  { path: 'wiki', component: WikiComponent },
  { path: 'uebermich', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
