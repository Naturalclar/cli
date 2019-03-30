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
export default function(latestRelease: Release, currentVersion: string) {
  const aWeek = 7 * 24 * 60 * 60 * 1000; // 7 days.

  const lastChecked = cacheManager.get('lastChecked');
  const now = new Date();
  if (!lastChecked || now - new Date(lastChecked) > aWeek) {
    logger.info(
      'Your current version of React Native is out of date. ' +
        `The latest version is ${latestRelease.tag_name}, ` +
        `while you're on v${currentVersion}`,
    );
    logger.info(`Changelog: ${chalk.underline(latestRelease.html_url)}`);
    logger.info(`To upgrade, run ${chalk.bold('react-native upgrade')}`);

    cacheManager.set('lastChecked', now.toISOString());
  }
}
