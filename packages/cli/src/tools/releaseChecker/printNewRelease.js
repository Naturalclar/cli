/**
 * @flow
 */
import chalk from 'chalk';
import logger from '../logger';
import type {Release} from './getLatestRelease';
import cacheManager from './releaseCacheManager';

/**
 * Notifies the user that a newer version of React Native is available.
 */
export default function printNewRelease(
  latestRelease: Release,
  currentVersion: string,
) {
  logger.info(
    'Your current version of React Native is out of date. ' +
      `The latest version is ${latestRelease.version}, ` +
      `while you're on ${currentVersion}`,
  );
  logger.info(`Changelog: ${chalk.underline(latestRelease.changelogUrl)}`);
  logger.info(`To upgrade, run ${chalk.bold('react-native upgrade')}`);

  cacheManager.set('lastChecked', new Date().toISOString());
}
