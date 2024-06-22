import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import argparse
import json

NUMBER_OF_RECOMMENDATIONS = 10

def recommend_posts(all_posts, interacted_post_ids):
    df_all_posts = pd.DataFrame(all_posts)

    df_interacted_posts = df_all_posts[df_all_posts['id'].isin(interacted_post_ids)].copy()

    df_all_posts['combined'] = df_all_posts['title'] + " " + df_all_posts['type']

    if not df_interacted_posts.empty:
        df_interacted_posts['combined'] = df_interacted_posts['title'] + " " + df_interacted_posts['type']

        vectorizer = TfidfVectorizer()
        tfidf_matrix = vectorizer.fit_transform(df_all_posts['combined'])

        interacted_tfidf_matrix = vectorizer.transform(df_interacted_posts['combined'])
        mean_interacted_vector = interacted_tfidf_matrix.mean(axis=0)

        mean_interacted_vector = np.asarray(mean_interacted_vector)

        tfidf_matrix = tfidf_matrix.toarray()

        similarities = cosine_similarity(mean_interacted_vector, tfidf_matrix)
    else:
        similarities = np.zeros((1, len(df_all_posts)))

    similar_indices = similarities.argsort().flatten()[::-1]

    non_interacted_indices = [idx for idx in similar_indices if df_all_posts.iloc[idx]['id'] not in interacted_post_ids]
    interacted_indices = [idx for idx in similar_indices if df_all_posts.iloc[idx]['id'] in interacted_post_ids]

    recommended_post_ids = df_all_posts.iloc[non_interacted_indices]['id'].tolist()

    recommended_post_ids.extend(df_all_posts.iloc[interacted_indices]['id'].tolist())

    return recommended_post_ids[:NUMBER_OF_RECOMMENDATIONS]

def main():
    parser = argparse.ArgumentParser(description="Recommend posts based on interacted posts.")
    parser.add_argument('--all_posts', type=str, required=True, help="JSON string of all posts.")
    parser.add_argument('--interacted_post_ids', type=str, required=True, help="JSON string of interacted post IDs.")
    
    args = parser.parse_args()
    
    all_posts = json.loads(args.all_posts)
    interacted_post_ids = json.loads(args.interacted_post_ids)
    
    recommendations = recommend_posts(all_posts, interacted_post_ids)
    print(json.dumps(recommendations))

if __name__ == "__main__":
    main()
