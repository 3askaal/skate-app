import { AdminPage } from '../pages/admin/admin';
import { MainPage } from '../pages/main/main';
import { MatesPage } from '../pages/mates/mates';
import { GamesPage } from '../pages/games/games';
import { RankingsPage } from '../pages/rankings/rankings';
import { SettingsPage } from '../pages/settings/settings';
import { LoginPage } from '../pages/auth/login/login';
import { RegisterPage } from '../pages/auth/register/register';

import { InvitePage } from '../pages/invite/invite';
import { LobbyPage } from '../pages/lobby/lobby';

import { TournamentsPage } from '../pages/tournaments/tournaments';
import { TournamentPage } from '../pages/tournaments/tournament/tournament';
import { GamePage } from '../pages/game/overview/overview';
import { TrickPage } from '../pages/game/trick/trick';
import { DefensePage } from '../pages/game/defense/defense';
import { ReportPage } from '../pages/games/report/report';

export const VIEWS: any = {
  login: LoginPage,
  main: MainPage,

  pages: {
    main: MainPage,
    play: InvitePage,
    mates: MatesPage,
    games: GamesPage,
    tournaments: TournamentsPage,
    stats: RankingsPage,
    settings: SettingsPage,
  },

  pregame: {
    players: InvitePage,
  },

  lobby: LobbyPage,

  game: {
    overview: GamePage,
    trick: TrickPage,
    defense: DefensePage,
    report: ReportPage,
  },

  routes: [
    { path: '', component: MainPage },
    { path: 'admin', component: AdminPage },
    { path: 'login', component: LoginPage },
    { path: 'register', component: RegisterPage },
    { path: 'mates', component: MatesPage },
    { path: 'stats', component: RankingsPage },
    { path: 'games', component: GamesPage },
    { path: 'games/report/:id', component: ReportPage },
    { path: 'tournaments', component: TournamentsPage },
    { path: 'tournaments/tournament/:id', component: TournamentPage },
    { path: 'invite', component: InvitePage },
    { path: 'lobby/:id', component: LobbyPage },
    { path: 'game/:id', component: GamePage },
    { path: 'game/:id/defense', component: DefensePage },
    { path: 'game/:id/trick', component: TrickPage },
    { path: 'rankings', component: RankingsPage },
  ],
};
