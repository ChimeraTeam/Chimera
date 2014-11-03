import java.util.Random;

/**
 * Created by gleb on 02.11.2014.
 */
public class FeedCreator {

    private static Long count = 1l;

    public static Feed getFeed() {
        Feed feed = new Feed();
        feed.setId(count);
        StringBuilder builder = new StringBuilder();
        for (long i = 0; i < 5000; i++) {
            feed.setNumber(feed.getNumber() == null ? "0" : feed.getNumber() + builder.append(", ").append(Long.valueOf(new Random().nextLong()).toString()));
            builder.setLength(0);
            feed.setPhase(feed.getPhase() == null ? "365.2" : feed.getPhase() + builder.append(", ").append(new Random().nextDouble()).toString());
            builder.setLength(0);
            feed.setFrequency(feed.getFrequency() == null ? "5.3" : feed.getFrequency() + builder.append(", ").append(new Random().nextDouble()).toString());
            builder.setLength(0);
        }
        count++;
        return validateFields(feed) ? feed : null;
    }

    private static boolean validateFields(Feed feed) {
        boolean check = false;
        if ((feed.getFrequency() != null && !feed.getFrequency().isEmpty()) &&
                (feed.getPhase() != null && !feed.getPhase().isEmpty()) &&
                (feed.getNumber() != null) &&
                (feed.getId() != null)) {
            check = Boolean.TRUE;
        }
        return check;
    }
}
