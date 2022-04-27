<script lang="ts">
// nが0ならそのまま0を返す
const calcParsentage = (max: number, n: number) => n ? n / max * 100 : 0;

const getProgress = (sections: SectionsEntity[], passedSections: SectionsEntity[]) =>
  `${passedSections.length} / ${sections.length} (${calcParsentage(sections.length, passedSections.length).toFixed(1)}%)`;

// Movieセクションの合計の秒を返す
const getTotalTime = (sections: MovieSectionBase[]) => sections.reduce((acc, cur) => acc + cur.length, 0);;

const formatTimeFromSeconds = (s: number) => `${Math.floor(s/3600)}時間${Math.floor((s%3600)/60)}分${s%60}秒`

const formatMovieTotalTime = (sections: MovieSection[]) => formatTimeFromSeconds(getTotalTime(sections));

const getProgressInTime = (sections: MovieSection[], passedSections: MovieSection[]) => {
  const totalTime = getTotalTime(sections);
  const passedTime = getTotalTime(passedSections);
  return `${formatMovieTotalTime(passedSections)} (${calcParsentage(totalTime, passedTime).toFixed(1)}%)`;
}
</script>
<script lang="ts" setup>
import { computed, inject } from 'vue';
import { NYobikoKey, NYobikoProviderStore } from '../provider';
import { SectionsEntity, ResourceTypes, MovieSectionBase, MovieSection } from '../../utils/getChapters';
import { localStorage as lsUtil } from '@tsutoringo/vue-utils'

const { chapters, loading, error } = inject(NYobikoKey) as NYobikoProviderStore;
const ls = inject(lsUtil.localStorageKey) as lsUtil.LocalStorageStore;
const ignoreSupplement = ls.getAsBoolean('ignore_supplement', true);

const sections = computed<SectionsEntity[]>(() => 
  !chapters.value
  ? [] // Chapterがない場合からの配列を返す
  : ignoreSupplement.value // サプリメント教材を無視するか否か
  ? chapters.value?.chapter.chapter.sections.filter(s => s.material_type !== 'supplement')
  : chapters.value?.chapter.chapter.sections
);

const filterSection = (resourceType: ResourceTypes, requiredPassed: boolean = false) => {
  return sections.value.filter((s) => {
    if (s.resource_type === resourceType) {
      if (requiredPassed) {
        return s.passed;
      }
      return true;
    }

    return false;
  });
};

// 動画教材群
const movie = computed(() => sections.value.filter<MovieSection>((s): s is MovieSection => s.resource_type === 'movie'));
const passedMovie = computed(() => sections.value.filter<MovieSection>((s): s is MovieSection => s.resource_type === 'movie' && s.passed));

// テスト群
const evaluationTests         = computed(() => filterSection('evaluation_test'));
const passedEvaluationTests   = computed(() => filterSection('evaluation_test', true));
const essayTests              = computed(() => filterSection('essay_test'));
const passedEssayTests        = computed(() => filterSection('essay_test', true));
const tests                   = computed(() => [...evaluationTests.value, ...essayTests.value]);
const passedTests             = computed(() => [...passedEvaluationTests.value, ...passedEssayTests.value]);

// レポート群
const evaluationReports       = computed(() => filterSection('evaluation_report'));
const passedEvaluationReports = computed(() => filterSection('evaluation_report', true));
const essayReports            = computed(() => filterSection('essay_report'));
const passedEssayReports      = computed(() => filterSection('essay_report', true));
const reports                 = computed(() => [...evaluationReports.value, ...essayReports.value]);
const passedReports           = computed(() => [...passedEvaluationReports.value, ...passedEssayReports.value]);

const passedSections = computed(() => sections.value.filter(s => s.passed));

</script>

<template>
  <table v-if="chapters" class="progress-table">
    <tr>
      <td class="padding" rowspan="15"></td><th colspan="2" class="merge-right-cell">全体</th><td>{{getProgress(sections, passedSections)}}</td>
    </tr>
    <tr>
      <!--                                        --><td rowspan="5" class="padding">    </td><th class="merge-right-cell">動画</th><td>{{formatMovieTotalTime(movie)}}</td>
    </tr>
    <tr>
      <!--                                                                                 --><td class="merge-right-cell">視聴済み</td><td>{{ getProgressInTime(movie, passedMovie) }}</td>
    </tr>
    <tr>
      <!--                                                                                 --><td class="merge-right-cell">未視聴</td><td>{{ formatTimeFromSeconds(getTotalTime(movie) - getTotalTime(passedMovie)) }}</td>
    </tr>
    <tr>
      <!--                                                                                 --><td class="merge-right-cell">授業動画数</td><td>{{ getProgress(movie, passedMovie) }}</td>
    </tr>
    <tr>
      <!--                                                                                 --><td class="merge-right-cell">動画平均時間</td><td>{{ formatTimeFromSeconds(Math.floor(getTotalTime(movie) / movie.length)) }}</td>
    </tr>
    <tr>
      <!--                                        --><td rowspan="3" class="padding">    </td><th class="merge-right-cell">テスト</th><td>{{ getProgress(tests, passedTests) }}</td>
    </tr>
    <tr>
      <!--                                                                                 --><td>選択/記述テスト</td><td>{{ getProgress(evaluationTests, passedEvaluationTests) }}</td>
    </tr>
    <tr>
      <!--                                                                                 --><td>論述テスト    </td><td>{{ getProgress(essayTests, passedEssayTests) }}</td>
    </tr>
    <tr>
      <!--                                        --><td rowspan="3" class="padding">    </td><th class="merge-right-cell">レポート</th><td>{{ getProgress(reports, passedReports) }}</td>
    </tr>
    <tr>
      <!--                                                                                 --><td>選択/記述レポート</td><td>{{ getProgress(evaluationReports, passedEvaluationReports) }}</td>
    </tr>
    <tr>
      <!--                                                                                 --><td>論述レポート    </td><td>{{ getProgress(essayReports, passedEssayReports) }}</td>
    </tr>
  </table>
  <div v-else class="message">
    <div v-if="loading">
    <p>読み込み中...🐾</p>
    </div>
    <div v-else-if="!chapters && !loading">
      <p>読み込みに失敗しました。😿</p>
    </div>
    <div v-else-if="error">
      <p>エラーが発生しました :(</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
table {
  --table-border: 1px solid #dbdbdb;
	border-collapse: collapse;
	border: var(--table-border);
	width: 100%;
}

table {
  td, th {
    padding: 7px;
  }

  tr td:first-child {
    border-left: var(--table-border);
  }

  td:not(.padding), th {
    border-top: var(--table-border);
  }

  td.padding {
    width: 15px;

    border-top: var(--table-border);
    border-left: var(--table-border);
  }
}

div.message {
  text-align: center;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>