import { settings, log } from 'nexus';

settings.change({
  server: {
    startMessage: (info) => {
      log.info('Welcome!');
      settings.original.server.startMessage(info);
    },
    port: +(process.env.PORT ?? 4000),
  },
});
